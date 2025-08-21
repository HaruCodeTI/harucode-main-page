# Configuração do EmailJS para Formulário de Contato

## 📧 O que é o EmailJS?

O EmailJS é um serviço que permite enviar emails diretamente do frontend JavaScript, sem necessidade de backend. É ideal para formulários de contato simples e eficientes.

## 🚀 Passos para Configuração

### 0. Email Destinatário
**Importante:** O formulário está configurado para enviar emails para:
- **Email principal**: `contato.harucode@gmail.com`
- **Configuração**: Já está definida no arquivo `src/lib/config.ts`

### 1. Criar conta no EmailJS
- Acesse [emailjs.com](https://www.emailjs.com/)
- Faça login com Google ou crie uma conta
- Acesse o dashboard

### 2. Configurar Serviço de Email
- No dashboard, vá em "Email Services"
- Clique em "Add New Service"
- Escolha "Gmail" (recomendado para uso pessoal)
- Faça login com sua conta Gmail
- Anote o **Service ID** gerado

### 3. Criar Template de Email
- Vá em "Email Templates"
- Clique em "Create New Template"
- Use o template abaixo como base:

```html
<h2>Nova mensagem de contato via site</h2>

<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Telefone:</strong> {{from_phone}}</p>
<p><strong>Empresa:</strong> {{from_company}}</p>
<p><strong>Assunto:</strong> {{subject}}</p>

<h3>Mensagem:</h3>
<p>{{message}}</p>

<hr>
<p><em>Mensagem enviada automaticamente pelo site da {{company_name}}</em></p>
```

- Salve o template e anote o **Template ID**

### 4. Obter Chave Pública
- No dashboard, vá em "Account" → "API Keys"
- Copie a **Public Key**

### 5. Atualizar Configuração
- Abra `src/lib/config.ts`
- Substitua os valores placeholder:

```typescript
emailjs: {
  serviceId: 'service_2p5vvqw',        // ✅ JÁ CONFIGURADO
  templateId: 'SEU_TEMPLATE_ID_AQUI',  // ⚠️ CONFIGURAR
  publicKey: 'SUA_PUBLIC_KEY_AQUI'     // ⚠️ CONFIGURAR
}
```

**Progresso atual:**
- ✅ Service ID: `service_2p5vvqw` (configurado)
- ✅ Template ID: `template_537uudr` (configurado)
- ✅ Public Key: `eNHB0M5ZBjtfnYNNl` (configurado)

**🎉 SISTEMA TOTALMENTE CONFIGURADO!**

## 🔧 Variáveis do Template

O formulário envia as seguintes variáveis para o template:

- `{{from_name}}` - Nome do remetente
- `{{from_email}}` - Email do remetente  
- `{{from_phone}}` - Telefone do remetente
- `{{from_company}}` - Empresa do remetente
- `{{subject}}` - Assunto selecionado
- `{{message}}` - Mensagem do usuário
- `{{to_email}}` - Email da HaruCode (contato.harucode@gmail.com)
- `{{reply_to}}` - Email do remetente para facilitar resposta
- `{{company_name}}` - Nome da empresa

## ✅ Teste

Após a configuração:
1. Preencha o formulário de contato
2. Clique em "Enviar mensagem"
3. Verifique se o email chegou na caixa de entrada configurada
4. Verifique o console do navegador para logs de debug

## 🚨 Limitações

- **Plano gratuito**: 200 emails/mês
- **Plano pago**: A partir de $15/mês para mais emails
- **Rate limiting**: Máximo de 2 emails por segundo no plano gratuito

## 🆘 Suporte

- [Documentação oficial](https://www.emailjs.com/docs/)
- [FAQ](https://www.emailjs.com/faq/)
- [Comunidade](https://community.emailjs.com/)

## 🔒 Segurança

- A chave pública é segura para uso no frontend
- O EmailJS valida os dados antes do envio
- Recomenda-se implementar rate limiting adicional se necessário
