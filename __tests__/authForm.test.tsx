import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "../components/AuthForm"; // 適切なパスに修正してください
import * as AuthService from "../app/services/authService";
import { useRouter } from "next/navigation";

// AuthServiceのmockを作成
jest.mock("../app/services/authService", () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
}));

// useRouterのモックを改善
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// コンポーネントのimport { useRouter } from "next/router";のエラー回避に記述
jest.mock("next/navigation");

describe("AuthForm Login Component", () => {
  it("メールアドレスとパスワードの入力フィールドが存在する", () => {
    render(<AuthForm />);
    expect(screen.getByTestId("emailInput")).toBeInTheDocument();
    expect(screen.getByTestId("passwordInput")).toBeInTheDocument();
  });

  it("ログインボタンが存在する", () => {
    render(<AuthForm />);
    expect(screen.getByTestId("loginButton")).toBeInTheDocument();
  });

  // it("パスワードを忘れた場合のリンクが存在する", () => {
  //   render(<AuthForm />);
  //   expect(screen.getByText(/Forgot your password?/i)).toBeInTheDocument();
  // });

  it("メールアドレスとパスワードの入力ができる", async () => {
    render(<AuthForm />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
  });

  test("初期状態でemailとpasswordが空文字列である", () => {
    render(<AuthForm />);

    // const emailInput = screen.getByTestId("emailInput");
    // const passwordInput = screen.getByTestId("passwordInput");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    // screen.debug(emailInput); // デバッグ情報を出力
    // screen.debug(passwordInput); // デバッグ情報を出力

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  it("ログインフォームの送信時に適切な処理が行われる", async () => {
    render(<AuthForm />);
    // const emailInput = screen.getByTestId("emailInput");
    // const passwordInput = screen.getByTestId("passwordInput");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByTestId("loginButton");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(loginButton);

    // 送信処理の結果をテストするため、ここではモック関数やAPIコールなどを使用する場合、
    // そのレスポンスを待つ必要がある。今回はその部分を示すためのawait waitForを使用する。
    await waitFor(() => {
      // ここでは例として、ログインが成功した後に表示されるメッセージを期待している。
      // 実際のテストでは、コンポーネントやアプリケーションの実装に応じて検証を行う。
      // 例: expect(screen.getByTestId('loginStatus')).toHaveTextContent('Logged in as: test@example.com');
    });
  });
});
describe("AuthForm Login Component - Negative Tests", () => {
  it("無効なメールアドレスがエラーを引き起こす", async () => {
    render(<AuthForm />);
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "invalid-email");
    const loginButton = screen.getByTestId("loginButton");
    await userEvent.click(loginButton);

    // バリデーションエラーメッセージを表示することを期待
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
  });

  it("空のパスワードがエラーを引き起こす", async () => {
    render(<AuthForm />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(emailInput, "test@example.com");
    // パスワードを入力しない
    const loginButton = screen.getByTestId("loginButton");
    await userEvent.click(loginButton);

    // パスワードが必須であることを示すエラーメッセージを表示することを期待
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });
});

describe("AuthForm Login Component", () => {
  // useRouterモックからpushメソッドを取得
  const mockRouter = {
    push: jest.fn(), // 今回はrouter.pushを利用します
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockRouter.push,
    }));
  });

  it("認証に成功した場合にホームページに遷移する", async () => {
    // signIn関数のMock実装（認証成功を模擬）
    (AuthService.signIn as jest.Mock).mockResolvedValue({
      success: true,
    });

    render(<AuthForm />);
    // const passwordInput = screen.getByLabelText("Password");
    // const emailInput = screen.getByLabelText("Email");

    // await userEvent.type(emailInput, "user@example.com");
    // await userEvent.type(passwordInput, "password");
    // // await userEvent.type(screen.getByTestId("emailInput"), "user@example.com");
    // await userEvent.click(screen.getByTestId("loginButton"));

    // await waitFor(() =>
    //   expect(AuthService.signIn).toHaveBeenCalledWith(
    //     "user@example.com",
    //     "password"
    //   )
    // );
    // await waitFor(() => {
    //   expect(mockRouter.push).toHaveBeenCalledTimes(1);
    // });
    // await waitFor(() => {
    //   expect(mockRouter.push).toHaveBeenCalledWith("/home");
    // });
    // // ホームページに遷移することを期待
    // // expect(mockRouter.push).toHaveBeenCalledTimes(1);

    // // Next.jsのuseRouterのモックをリセット
    // jest.resetAllMocks();

    const switchLinks = screen.getAllByTestId("switchLink");
    // 必要に応じて特定のリンクを選択
    const targetLink = switchLinks[0]; // 例として最初のリンクを選択

    await userEvent.click(targetLink);

    // 以降はログインモードでのテストを続行
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(screen.getByTestId("loginButton"));

    // AuthService.signInが期待される引数で呼び出されたかを検証
    // この部分は、AuthService.signInがモック化されていることを前提としています
    await waitFor(() =>
      expect(AuthService.signIn).toHaveBeenCalledWith(
        "user@example.com",
        "password"
      )
    );

    // ホームページに遷移するかを検証
    // この部分は、useRouterのpushメソッドがモック化されていることを前提としています
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/home");
    });
  });
  it("ログイン認証に失敗した場合にエラーメッセージを表示する", async () => {
    // signIn関数のMock実装（認証失敗を模擬）
    (AuthService.signIn as jest.Mock).mockRejectedValue(
      new Error("Invalid email or password")
    );

    render(<AuthForm />);

    const switchLinks = screen.getAllByTestId("switchLink");
    // 必要に応じて特定のリンクを選択
    const targetLink = switchLinks[0]; // 例として最初のリンクを選択

    await userEvent.click(targetLink);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "wrongpassword" },
    });

    // fireEvent.change(confirmPassword, {
    //   target: { value: "wrongpassword" },
    // });

    fireEvent.click(screen.getByTestId("loginButton"));

    await waitFor(() =>
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument()
    );
  });
  it("新規登録の認証に失敗した場合にエラーメッセージを表示する", async () => {
    // signIn関数のMock実装（認証失敗を模擬）
    (AuthService.signUp as jest.Mock).mockRejectedValue(
      new Error("Invalid email or password")
    );

    render(<AuthForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPassword = screen.getByLabelText("Confirm Password");

    fireEvent.change(emailInput, {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "wrongpassword" },
    });

    fireEvent.change(confirmPassword, {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByTestId("loginButton"));

    await waitFor(() =>
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument()
    );
  });
});

function mockHandleSubmit() {
  const mockFn = jest.fn();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [k: string]: unknown } = {};
    formData.forEach((value, key) => (data[key] = value));
    mockFn(data);
  };
  return [mockFn, onSubmit] as const;
}
