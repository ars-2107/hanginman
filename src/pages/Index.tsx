import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import HangmanGame from "@/components/HangmanGame";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
        <div className="w-full h-screen max-w-lg mx-auto shadow-xl rounded-lg overflow-hidden">
          <Header />
          <main className="flex-1 flex flex-col overflow-hidden">
            <HangmanGame />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;