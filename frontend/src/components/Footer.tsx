export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Mason Dalton
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="mailto:mcoled@byu.edu"
              className="text-primary hover:underline"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/mason-dalton"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/mcoled"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
