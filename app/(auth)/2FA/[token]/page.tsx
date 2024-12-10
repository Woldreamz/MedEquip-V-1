"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVerification } from "../../../../context/VerificationContext";

export default function VerifyAccount({params: promiseParams}:{params: Promise<{token: string}>}) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setVerificationStatus } = useVerification(); // Use the VerificationContext

  useEffect(() => {
    promiseParams.then(({ token }) => {
      setToken(token);
    });
  }, [promiseParams]);

  useEffect(() => {
    if (!token) {
      console.error("Token is missing in the URL request")
      return;
    }; // Wait until the router and token are ready

    const verifyToken = async () => {
      console.log("Verifying token:", token);
      try {
        const response = await fetch(`https://medequip-api.vercel.app/api/auth/verify/${token}`);
        if (!response.ok) throw new Error('Failed to verify token', response.json);

        const result = await response.json();
        setData(result);
        setVerificationStatus("success"); // Update the verification status in the VerificationContext
        router.push("/verified");
      } catch (err) {
        setError(err.message);
        setVerificationStatus("error");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [router, token, setVerificationStatus]); // Trigger when router is ready and token is available

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Verification Successful</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}