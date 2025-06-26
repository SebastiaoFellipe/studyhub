import HeroImage from '../assets/images/home-livros-casal.png';

const Home = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto py-16 px-4">
      <div className="md:w-1/2 text-center md:text-left bg-white p-4 py-6 rounded-bl-md rounded-l-md shadow-lg">
        <h1 className="text-4xl font-extrabold text-[var(--color-secondary)] mb-4">
          Transforme seus estudos em conquistas reais
        </h1>
        <p className="text-lg text-[var(--color-dark)]">
          Acelere seu aprendizado com técnicas comprovadas, flashcards e produtividade.
        </p>
      </div>
      <div className="md:w-1/2 mb-8 md:mb-0">
        <img
          src={HeroImage}
          alt="Casal estudando com livros"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Home;