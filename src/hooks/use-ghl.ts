import { useState } from 'react';

interface ContactPayload {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  assunto: string;
  mensagem: string;
}

interface UseGHLReturn {
  submit: (data: ContactPayload) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  reset: () => void;
}

const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY;
const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID;
const N8N_WEBHOOK = 'https://n8n.harucode.com.br/webhook/97675544-b4af-4bd4-adbd-b219e765b194';

function formatPhoneForAPI(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `+55${digits}`;
}

function formatPhoneForWebhook(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `55${digits}`;
}

async function submitToGHL(data: ContactPayload): Promise<void> {
  const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      firstName: data.nome.split(' ')[0],
      lastName: data.nome.split(' ').slice(1).join(' ') || '',
      email: data.email,
      phone: formatPhoneForAPI(data.telefone),
      companyName: data.empresa || undefined,
      tags: [data.assunto || 'site-contato'],
      source: 'website',
      customFields: [
        { key: 'mensagem', field_value: data.mensagem },
        { key: 'assunto', field_value: data.assunto },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GHL API error: ${response.status} - ${body}`);
  }
}

async function submitToN8N(data: ContactPayload): Promise<void> {
  const response = await fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      telefone: formatPhoneForWebhook(data.telefone),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Webhook error: ${response.status} - ${body}`);
  }
}

export function useGHL(): UseGHLReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useGHLAPI = Boolean(GHL_API_KEY && GHL_LOCATION_ID);

  const submit = async (data: ContactPayload) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      if (useGHLAPI) {
        await submitToGHL(data);
      } else {
        await submitToN8N(data);
      }
      setIsSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar mensagem.';
      if (useGHLAPI) {
        try {
          await submitToN8N(data);
          setIsSuccess(true);
          setError(null);
        } catch (fallbackErr) {
          const fallbackMessage = fallbackErr instanceof Error ? fallbackErr.message : message;
          setError(`Não foi possível enviar sua mensagem. ${fallbackMessage}`);
        }
      } else {
        setError(`Não foi possível enviar sua mensagem. ${message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  };

  return { submit, isLoading, isSuccess, error, reset };
}
