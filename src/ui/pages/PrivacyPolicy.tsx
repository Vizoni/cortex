export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-4xl font-bold text-gray-900">
            Política de Privacidade
          </h1>
          
          <p className="mb-4 text-sm text-gray-500">
            Última atualização: 7 de fevereiro de 2026
          </p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                1. Informações que Coletamos
              </h2>
              <p>
                O Cortex coleta informações quando você faz login usando sua conta Google.
                Coletamos apenas as informações essenciais: nome, endereço de e-mail e foto
                de perfil, conforme autorizado por você durante o processo de autenticação.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                2. Como Usamos suas Informações
              </h2>
              <p>
                Utilizamos suas informações para:
              </p>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                <li>Autenticar e identificar você em nossa plataforma</li>
                <li>Personalizar sua experiência de uso</li>
                <li>Melhorar nossos serviços</li>
                <li>Comunicar atualizações importantes sobre o sistema</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                3. Compartilhamento de Dados
              </h2>
              <p>
                Não compartilhamos, vendemos ou alugamos suas informações pessoais a terceiros.
                Seus dados são utilizados exclusivamente para o funcionamento do Cortex.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                4. Segurança
              </h2>
              <p>
                Implementamos medidas de segurança para proteger suas informações contra
                acesso não autorizado, alteração, divulgação ou destruição. Utilizamos
                protocolos OAuth 2.0 do Google para autenticação segura.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                5. Seus Direitos
              </h2>
              <p>
                Você tem o direito de:
              </p>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                <li>Acessar suas informações pessoais</li>
                <li>Solicitar a correção de dados incorretos</li>
                <li>Solicitar a exclusão de sua conta e dados</li>
                <li>Revogar o acesso do aplicativo à sua conta Google a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                6. Cookies e Armazenamento Local
              </h2>
              <p>
                Utilizamos armazenamento local do navegador (localStorage) para manter
                sua sessão ativa e melhorar sua experiência. Não utilizamos cookies de
                rastreamento de terceiros.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                7. Mudanças nesta Política
              </h2>
              <p>
                Podemos atualizar esta política periodicamente. Notificaremos sobre
                mudanças significativas através do próprio aplicativo.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                8. Contato
              </h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato
                através do email: privacy@cortex.app
              </p>
            </section>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Voltar para a página inicial
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
