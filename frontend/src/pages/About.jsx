import { FaClock, FaLayerGroup, FaEdit } from 'react-icons/fa';
import { GrBook } from "react-icons/gr";

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <div className="text-white bg-secondary p-3 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-left">
      {children}
    </p>
  </div>
);

const About = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        
        {/* Seção Principal */}
        <div className="max-w-4xl mx-auto">
          <GrBook className="text-secondary text-5xl mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Bem-vindo ao StudyHub</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            O StudyHub nasceu de uma ideia simples: por que alternar entre dezenas de aplicativos e sites quando as melhores ferramentas de estudo podem estar em um só lugar? Nossa missão é centralizar técnicas de aprendizado e organização comprovadamente eficazes, oferecendo uma plataforma integrada, flexível e fácil de usar para otimizar sua jornada de aprendizado.
          </p>
        </div>

        {/* Seção de Métodos */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Nossos Métodos e Como Utilizá-los</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <FeatureCard 
              icon={<FaClock size={24} />}
              title="Pomodoro & Tarefas"
            >
              <strong>Por que funciona:</strong> A <strong>Técnica Pomodoro</strong> combate a procrastinação e o esgotamento ao dividir o estudo em blocos de foco intenso (geralmente 25 minutos) com pausas curtas. Isso melhora a concentração e a resistência mental.
              <br/><br/>
              <strong>Como usar no StudyHub:</strong> Vá para a página <strong>Pomodoro</strong>, adicione suas tarefas no gerenciador ao lado e inicie o timer para uma sessão focada em uma tarefa específica.
            </FeatureCard>

            <FeatureCard 
              icon={<FaLayerGroup size={24} />}
              title="Flashcards (SRS)"
            >
              <strong>Por que funciona:</strong> Os flashcards se baseiam em dois pilares da memorização: a <strong>recordação ativa</strong> (forçar seu cérebro a lembrar de uma resposta) e a <strong>repetição espaçada</strong> (revisar a informação em intervalos crescentes, pouco antes de você esquecê-la).
              <br/><br/>
              <strong>Como usar no StudyHub:</strong> Crie seus decks de flashcards e use o modo "Estudar" para que nosso sistema agende as revisões para você.
            </FeatureCard>

            <FeatureCard 
              icon={<FaEdit size={24} />}
              title="Anotações Estruturadas"
            >
              <strong>Por que funciona:</strong> Anotar não é apenas transcrever, mas sim processar e organizar a informação. Um sistema de anotações bem estruturado com títulos, listas e destaques torna o conteúdo mais fácil de ser assimilado e revisado posteriormente.
              <br/><br/>
              <strong>Como usar no StudyHub:</strong> Utilize nossa seção de <strong>Anotações</strong> para criar resumos e mapas mentais. Use as ferramentas de formatação para organizar suas ideias de forma clara e lógica.
            </FeatureCard>

          </div>
        </div>

      </div>
    </div>
  );
}

export default About;