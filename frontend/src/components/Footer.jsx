const Footer = () => {
  return (
    <footer className="bg-[var(--color-dark)] text-[var(--color-background)] text-center py-4">
      <p className="text-sm">© {new Date().getFullYear()} StudyHub. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;