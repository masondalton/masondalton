import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted mb-8">Page not found.</p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </Layout>
  );
}
