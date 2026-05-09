import Layout from "@/components/Layout";
import NotesList from "@/components/NotesList";

export default function App() {
  return (
    <Layout>
      <main id="main-content">
        <NotesList />
      </main>
    </Layout>
  );
}
