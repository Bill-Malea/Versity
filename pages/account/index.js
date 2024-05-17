import { useEffect } from "react";
import { useRouter } from "next/router";
import AccountPage from "@/components/Account/accounts";
import { auth } from "@/firebase.config";
const AccountDetails = () => {
  const router = useRouter();

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [router, user]);

  return (
    <div>
      <AccountPage />
    </div>
  );
};

export default AccountDetails;
