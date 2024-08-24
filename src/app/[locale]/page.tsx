import LocaleSwitcher from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <LocaleSwitcher />
      <h1>Home</h1>
    </div>
  );
}
