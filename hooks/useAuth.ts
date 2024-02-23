// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // supabaseClientのパスはプロジェクトに合わせて調整

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // 最初の状態をnullにして、ローディング状態を表現

  useEffect(() => {
    const checkUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        setLoggedIn(false); // エラーがある場合はログインしていないと見なす
        return;
      }

      setLoggedIn(!!user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoggedIn(!!session?.user);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return loggedIn;
};

export default useAuth;
