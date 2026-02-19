interface Env {
  GHL_API_TOKEN: string;
  GHL_LOCATION_ID: string;
  GHL_PIPELINE_ID: string;
  GHL_STAGE_ID: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle OPTIONS request for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// Handle POST request from the form
export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  try {
    const body: any = await request.json();

    // 1. Extract and format fields sent by the frontend
    const { name = "", email, phone, companyName = "" } = body;

    // Check required fields (either email or phone)
    if (!email && !phone) {
      return new Response(JSON.stringify({ error: "Email ou telefone é obrigatório" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Split 'name' into firstName and lastName for GHL Payload
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // Common Headers for GHL API v2
    const ghlHeaders = {
      "Authorization": `Bearer ${env.GHL_API_TOKEN}`,
      "Version": "2021-07-28",
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    // 2. Upsert Contact Payload
    const upsertPayload = {
      firstName,
      lastName,
      name,
      email,
      phone,
      locationId: env.GHL_LOCATION_ID,
      companyName,
      tags: ["lead_integra_erp"],
      source: "Landing Page IntegraERP"
    };

    // Make the Upsert Request
    const upsertResponse = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify(upsertPayload)
    });

    if (!upsertResponse.ok) {
      const errorText = await upsertResponse.text();
      console.error(`GHL Upsert Error: ${upsertResponse.status} - ${errorText}`);
      throw new Error("Erro ao criar/atualizar contato no CRM.");
    }

    const upsertData: any = await upsertResponse.json();
    const contactId = upsertData.contact?.id;

    if (!contactId) {
      throw new Error("Falha ao obter o ID do contato (contactId) do CRM.");
    }

    // 3. Create Opportunity payload
    const opportunityName = companyName ? `Lead - ${companyName}` : `Lead - ${name || email || phone}`;
    const oppPayload = {
      pipelineId: env.GHL_PIPELINE_ID,
      locationId: env.GHL_LOCATION_ID,
      contactId: contactId,
      name: opportunityName,
      status: "open"
    };

    // Make the Create Opportunity Request
    const oppResponse = await fetch("https://services.leadconnectorhq.com/opportunities/", {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify(oppPayload)
    });

    if (!oppResponse.ok) {
      const errorText = await oppResponse.text();
      console.error(`GHL Opportunity Error: ${oppResponse.status} - ${errorText}`);
      throw new Error("Erro ao criar oportunidade no CRM.");
    }

    const oppData: any = await oppResponse.json();

    // 4. Return Success
    return new Response(JSON.stringify({
      success: true,
      contactId,
      opportunityId: oppData.opportunity?.id
    }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Erro na integração GHL:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }
}
