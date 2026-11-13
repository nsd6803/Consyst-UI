import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Status } from "@/components/ui/status";
import { Progress } from "@/components/ui/feedback";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconDots, IconPen, IconTrash } from "@/components/ui/icons";

export default function CardDemo() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, width: "100%" }}>
      <Card variant="elevated">
        <CardHeader
          action={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" iconOnly aria-label="Действия">
                  <IconDots />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem icon={<IconPen />}>Редактировать</DropdownMenuItem>
                <DropdownMenuItem icon={<IconTrash />} danger>
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        >
          <CardTitle>Летняя практика 2026</CardTitle>
          <CardDescription>Отдел разработки · 12 практикантов</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={64} label="Прохождение" showValue tone="success" />
        </CardContent>
        <CardFooter>
          <Status tone="success" style={{ marginRight: "auto" }}>
            Идёт
          </Status>
          <Button size="sm" variant="soft">
            Открыть
          </Button>
        </CardFooter>
      </Card>
      <Card variant="filled">
        <CardHeader>
          <CardTitle>Заявки на согласовании</CardTitle>
          <CardDescription>Требуют вашего решения</CardDescription>
        </CardHeader>
        <CardContent>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: "48px", fontWeight: 700 }}>18</span>
        </CardContent>
      </Card>
    </div>
  );
}
