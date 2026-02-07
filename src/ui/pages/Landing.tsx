export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Header */}
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Cortex
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Sistema inteligente de gestão e organização
          </p>

          {/* Descrição da finalidade */}
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Sobre o Cortex
            </h2>
            <p className="mb-4 text-gray-600">
              O Cortex é uma plataforma moderna que facilita a gestão e organização
              de suas atividades diárias. Com autenticação segura via Google, você
              tem acesso a ferramentas intuitivas para melhorar sua produtividade.
            </p>
            <p className="text-gray-600">
              Faça login para começar a usar todas as funcionalidades da plataforma.
            </p>
          </div>

          {/* Botão de Login */}
          <div className="mb-12">
            <a
              href="/login"
              className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Acessar Sistema
            </a>
          </div>

          {/* Footer com links */}
          <div className="border-t border-gray-300 pt-8">
            <div className="flex justify-center gap-8 text-sm text-gray-600">
              <a href="/privacy-policy" className="hover:text-blue-600">
                Política de Privacidade
              </a>
              <a href="/terms" className="hover:text-blue-600">
                Termos de Uso
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              © 2026 Cortex. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
