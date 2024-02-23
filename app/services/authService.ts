// services/authService.ts

import { supabase } from "../../supabaseClient";

interface SignInAuthResponse {
  success: boolean;
  message?: string;
  user?: object; // この型も必要に応じて詳細な型に変更することができます
}

// services/authService.ts
interface SignupAuthResponse {
  success: boolean;
  message?: string;
  user?: any | null; // Supabaseから返されるUser型を使用する
  session?: any | null; // Supabaseから返されるSession型を使用する
}

export const signIn = async (
  email: string,
  password: string
): Promise<SignInAuthResponse> => {
  try {
    // APIの戻り値の型に対応するため、ここでの変数名を`response`に変更しています。
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // `error`がnullでない場合はエラーが発生しているので、エラーメッセージを投げます。
    if (response.error) {
      throw new Error(response.error.message);
    }

    // `data`オブジェクトの中の`user`をチェックします。
    if (response.data.user) {
      // ユーザー情報が存在すれば、認証成功として扱います。
      return { success: true, user: response.data.user };
    } else {
      // `user`がnullの場合は認証失敗として扱います。
      return {
        success: false,
        message: "ユーザー情報は取得できませんでした。",
      };
    }
  } catch (error: any) {
    // 例外をキャッチし、エラーメッセージを含むオブジェクトを返します。
    return {
      success: false,
      message: error.message || "不明なエラーが発生しました。",
    };
  }
};

export const signUp = async (
  email: string,
  password: string
): Promise<SignupAuthResponse> => {
  try {
    const response = await supabase.auth.signUp({
      email,
      password,
    });

    // response.errorがnullでない、つまりエラーがある場合
    if (response.error) {
      return { success: false, message: response.error.message };
    }

    // response.data.userが存在する場合、ユーザーの登録に成功したと見なす
    if (response.data.user) {
      return {
        success: true,
        user: response.data.user,
        session: response.data.session,
      };
    } else {
      // response.data.userがnullの場合、何らかの理由で登録に失敗したと見なす
      return { success: false, message: "ユーザーの登録に失敗しました。" };
    }
  } catch (error: any) {
    // 例外が発生した場合、エラーメッセージと共に失敗レスポンスを返す
    return {
      success: false,
      message: error.message || "不明なエラーが発生しました。",
    };
  }
};
