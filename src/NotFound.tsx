import { useNavigate } from "react-router";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[150px] sm:text-[300px] md:text-[400px] font-black pointer-events-none text-sky-text/20"
      >
        404
      </div>

      <div className="min-h-screen px-2 sm:px-4 flex flex-col items-center justify-center gap-4 sm:gap-6">
        <h1 className="mt-72 sm:mt-40 relative z-10 text-3xl sm:text-4xl md:text-6xl text-center font-extrabold tracking-wide text-sky-text-muted">
          that page doesn't exist.
        </h1>

        <Button className="relative z-10" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
