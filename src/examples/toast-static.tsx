import { Toast } from "@/components/ui/toast";

export default function ToastStatic() {
  return (
    <Toast
      type="success"
      title="Heading text"
      description="Lorem ipsum dolor sit amet consectetur. Amet faucibus habitasse et quis consequat."
      onClose={() => {}}
    />
  );
}
