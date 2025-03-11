import { useRouter } from 'next/navigation';

const Unauthorized = () => {
  const router = useRouter();

  return (
    <div>
      <p style={{ textAlign: "center", marginTop: "50px", fontSize: "24px", fontWeight: "bold" }}>
        404 - İzinsiz giriş
      </p>
      <button
        onClick={() => router.push("/")}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4682B4",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Ana ekrana geri dön
      </button>
    </div>
  );
};

export default Unauthorized;
