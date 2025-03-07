
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();

  const handleLogin = (data: { username: string; password: string }) => {
    console.log("Login data:", data);
    toast({
      title: "Login Attempted",
      description: `Trying to login with username: ${data.username}`,
    });
    // Here you would handle the actual login logic
  };

  const handleSignup = (data: any) => {
    console.log("Signup data:", data);
    toast({
      title: "Signup Successful!",
      description: `Welcome ${data.name}! Your account has been created.`,
    });
    // Here you would handle the actual signup logic
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-pregnancy-soft-purple/30 to-pregnancy-soft-blue/20 p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pregnancy-secondary">Pregnancy Portal</h1>
          <p className="text-muted-foreground mt-2">
            Your personal companion through your pregnancy journey
          </p>
        </div>

        <Card className="border-pregnancy-soft-purple/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-pregnancy-primary">
              {activeTab === "login" ? "Welcome Back" : "Join Us"}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login"
                ? "Sign in to your account to continue"
                : "Create an account to start your journey"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="login"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="space-y-4">
                <LoginForm onSubmit={handleLogin} />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm onSubmit={handleSignup} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
