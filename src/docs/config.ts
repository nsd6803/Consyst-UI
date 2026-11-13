export type PropDoc = { name: string; type: string; default?: string; description: string };
export type ExampleDoc = { name: string; title: string; description?: string };

export type ComponentDoc = {
  slug: string;
  title: string;
  description: string;
  /** Главный файл в src/registry — остальные файлы и npm-пакеты вычисляются по импортам */
  entry: string;
  demo: string;
  usage: string;
  examples?: ExampleDoc[];
  props?: PropDoc[];
  /** Когда использовать / когда нет */
  dos?: string[];
  donts?: string[];
  /** Клавиатура и скринридеры */
  a11y?: string[];
  figma?: string;
  wide?: boolean;
  /** Новый компонент (не было в макетах) */
  isNew?: boolean;
};

export type NavItem = { slug: string; title: string; badge?: string };
export type NavGroup = { title: string; items: NavItem[] };

export const FIGMA_FILE = "https://www.figma.com/design/PmDgV8oNrgYoOvoa3lBdXl/Consyst-UI";
export const figmaLink = (node?: string) => (node ? `${FIGMA_FILE}?node-id=${node.replace(":", "-")}` : FIGMA_FILE);

const sizeProp: PropDoc = { name: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "Высота 32 / 40 / 48 — общая для всех контролов" };
const invalidProp: PropDoc = { name: "invalid", type: "boolean", description: "Подсветка ошибки без Field (внутри Field берётся из error)" };

export const components: ComponentDoc[] = [
  /* ================================ Формы ================================ */
  {
    slug: "button",
    title: "Button",
    description: "Запускает действие. 5 вариантов, смысловой тон (danger, success), 3 размера, загрузка и кнопка-иконка.",
    entry: "button.tsx",
    demo: "button-demo",
    usage: `import { Button } from "@/components/ui/button";

<Button onClick={save}>Сохранить</Button>
<Button variant="soft" tone="danger">Удалить</Button>`,
    examples: [
      { name: "button-variants", title: "Варианты и тон", description: "Вариант — визуальная важность, тон — смысл действия. Их можно сочетать." },
      { name: "button-sizes", title: "Размеры", description: "sm 32px · md 40px · lg 48px — те же высоты, что у Input и Select." },
      { name: "button-states", title: "Загрузка, disabled, ссылка", description: "loading блокирует повторное нажатие; asChild превращает ссылку в кнопку по стилю." },
    ],
    props: [
      { name: "variant", type: `"primary" | "secondary" | "soft" | "ghost" | "link"`, default: `"primary"`, description: "Визуальная важность" },
      { name: "tone", type: `"default" | "danger" | "success"`, default: `"default"`, description: "Смысловой цвет" },
      sizeProp,
      { name: "leftIcon / rightIcon", type: "ReactNode", description: "Иконки по краям" },
      { name: "iconOnly", type: "boolean", description: "Квадратная кнопка с иконкой в children. Нужен aria-label" },
      { name: "loading", type: "boolean", description: "Индикатор + блокировка" },
      { name: "fullWidth", type: "boolean", description: "На всю ширину" },
      { name: "asChild", type: "boolean", description: "Стили кнопки на дочернем элементе (<a>, <Link>)" },
    ],
    dos: ["Одна primary-кнопка на экран или форму — главное действие", "Глагол в названии: «Сохранить», «Отправить отчёт»", "Опасные действия — tone=\"danger\" и подтверждение в Modal"],
    donts: ["Не ставьте рядом две primary", "Не используйте link для действий, которые меняют данные", "Не делайте кнопку-иконку без aria-label"],
    a11y: ["Enter и Пробел нажимают кнопку", "Видимый фокус-ринг при навигации с клавиатуры", "loading выставляет aria-busy и disabled"],
    figma: "12621:1663",
  },
  {
    slug: "field",
    title: "Field",
    isNew: true,
    description: "Обёртка поля формы: подпись, подсказка и ошибка. Подпись стоит внутри поля и при фокусе или вводе уезжает наверх (floating label). Связывает всё с контролом через id и aria-атрибуты.",
    entry: "field.tsx",
    demo: "field-demo",
    usage: `import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

<Field label="Email" required description="Для уведомлений" error={errors.email}>
  <Input type="email" />
</Field>`,
    examples: [{ name: "field-horizontal", title: "Горизонтальная форма", description: "orientation=\"horizontal\" или labelPlacement=\"top\" — подпись всегда снаружи. Так же ведут себя поля размера sm." }],
    props: [
      { name: "label", type: "ReactNode", description: "Подпись. Input, Textarea, Select и MultiSelect забирают её внутрь поля" },
      { name: "labelPlacement", type: `"floating" | "top"`, default: `"floating"`, description: "Подпись внутри поля или всегда над ним" },
      { name: "description", type: "ReactNode", description: "Подсказка под полем" },
      { name: "error", type: "ReactNode", description: "Текст ошибки: подсвечивает поле, aria-invalid, читается скринридером" },
      { name: "required", type: "boolean", description: "Звёздочка и required у контрола" },
      { name: "disabled", type: "boolean", description: "Отключает контрол внутри" },
      { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Подпись сверху или слева" },
    ],
    dos: ["Всегда давайте полю подпись: она не пропадает при вводе, а уезжает наверх", "placeholder — пример формата («ДД.ММ.ГГГГ»), он появляется после фокуса", "Показывайте ошибку под полем конкретно: что не так и как исправить"],
    donts: ["Не пишите подпись в placeholder вместо label", "Не используйте плавающую подпись в sm-полях фильтров — там подпись сверху"],
    a11y: ["label связан с контролом через htmlFor/id", "Подсказка и ошибка подключены через aria-describedby", "Ошибка с role=\"alert\" — озвучивается сразу"],
  },
  {
    slug: "input",
    title: "Input",
    description: "Однострочное поле: иконки слева и справа, очистка, показ пароля, три размера, состояние ошибки.",
    entry: "input.tsx",
    demo: "input-demo",
    usage: `import { Input } from "@/components/ui/input";

<Input label="ФИО" prefix={<IconUser />} clearable />`,
    examples: [{ name: "input-sizes", title: "Размеры", description: "Поле и кнопка одного размера совпадают по высоте." }],
    props: [
      sizeProp,
      { name: "label", type: "ReactNode", description: "Плавающая подпись (внутри Field — из его label)" },
      { name: "prefix / suffix", type: "ReactNode", description: "Иконка или текст по краям (₽, дней)" },
      { name: "clearable", type: "boolean", description: "Крестик очистки" },
      { name: "onClear", type: "() => void", description: "Колбэк очистки для контролируемого поля" },
      invalidProp,
      { name: "type=\"password\"", type: "", description: "Автоматически добавляет кнопку «показать пароль»" },
    ],
    dos: ["Оборачивайте в Field, чтобы была подпись и ошибка", "Подпись внутри поля уезжает наверх при фокусе и вводе"],
    donts: ["Не используйте placeholder как подпись", "Не делайте поле уже ожидаемого значения"],
    a11y: ["Кнопки очистки и показа пароля доступны с клавиатуры и подписаны"],
    figma: "12531:2613",
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "Многострочное поле: счётчик символов, автоматическая высота.",
    entry: "textarea.tsx",
    demo: "textarea-demo",
    usage: `import { Textarea } from "@/components/ui/textarea";

<Textarea label="Комментарий" maxLength={500} showCount autoResize />`,
    props: [
      { name: "label", type: "ReactNode", description: "Плавающая подпись (внутри Field — из его label)" },
      { name: "showCount", type: "boolean", description: "Счётчик «12 / 500» (нужен maxLength)" },
      { name: "autoResize", type: "boolean", description: "Высота растёт по мере ввода" },
      { name: "maxRows", type: "number", default: "10", description: "Предел автовысоты" },
      invalidProp,
    ],
    a11y: ["Счётчик в aria-live — скринридер сообщает остаток"],
    figma: "12531:2613",
  },
  {
    slug: "search",
    title: "Search",
    description: "Поле поиска: Input с лупой, очисткой и поиском по Enter.",
    entry: "search.tsx",
    demo: "search-demo",
    usage: `import { Search } from "@/components/ui/search";

<Search value={q} onChange={(e) => setQ(e.target.value)} onSearch={run} />`,
    props: [
      sizeProp,
      { name: "onSearch", type: "(value: string) => void", description: "По нажатию Enter" },
      { name: "clearable", type: "boolean", default: "true", description: "Крестик очистки" },
    ],
    figma: "12531:2613",
  },
  {
    slug: "select",
    title: "Select",
    description: "Выбор одного значения из списка. Группы, недоступные пункты, клавиатура и ARIA из Radix.",
    entry: "select.tsx",
    demo: "select-demo",
    usage: `import { Select } from "@/components/ui/select";

<Select
  value={university}
  onValueChange={setUniversity}
  options={[{ value: "mirea", label: "РТУ МИРЭА" }]}
/>`,
    props: [
      { name: "options", type: "{ value, label, disabled?, group? }[]", description: "Пункты; group — заголовок группы" },
      { name: "value / defaultValue", type: "string", description: "Выбранное значение" },
      { name: "onValueChange", type: "(value: string) => void", description: "Выбор" },
      { name: "placeholder", type: "string", default: `"Выберите"`, description: "Текст пустого поля; при плавающей подписи виден только в открытом состоянии" },
      { name: "label", type: "ReactNode", description: "Плавающая подпись (внутри Field — из его label)" },
      sizeProp,
      invalidProp,
    ],
    dos: ["До 7 пунктов можно показать RadioGroup — выбор будет виден сразу"],
    donts: ["Для множественного выбора используйте MultiSelect, а не набор Select"],
    a11y: ["↑/↓ — навигация, Enter — выбор, Esc — закрыть, буква — переход к пункту", "role=listbox / option, aria-expanded"],
    figma: "12621:881",
  },
  {
    slug: "multi-select",
    title: "MultiSelect",
    isNew: true,
    description: "Множественный выбор с поиском и сбросом — для фильтров таблиц (бывший Dropdown с чекбоксами).",
    entry: "multi-select.tsx",
    demo: "multi-select-demo",
    usage: `import { MultiSelect } from "@/components/ui/multi-select";

<MultiSelect options={statuses} value={filter} onValueChange={setFilter} />`,
    props: [
      { name: "options", type: "{ value, label, disabled? }[]", description: "Пункты" },
      { name: "value / defaultValue", type: "string[]", description: "Выбранные значения" },
      { name: "onValueChange", type: "(value: string[]) => void", description: "Изменение выбора" },
      { name: "searchable", type: "boolean", default: "авто (> 7 пунктов)", description: "Поиск по списку" },
      { name: "resettable", type: "boolean", default: "true", description: "Пункт «Сбросить»" },
      sizeProp,
    ],
    a11y: ["↓ из поиска переходит в список, ↑/↓ — по пунктам", "aria-multiselectable, aria-selected у пунктов"],
    figma: "12621:881",
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "Независимый выбор: один или несколько пунктов. Поддерживает частичный выбор (indeterminate).",
    entry: "checkbox.tsx",
    demo: "checkbox-demo",
    usage: `import { Checkbox } from "@/components/ui/checkbox";

<Checkbox label="Согласен с условиями" checked={ok} onCheckedChange={setOk} />`,
    props: [
      { name: "checked", type: `boolean | "indeterminate"`, description: "Состояние" },
      { name: "onCheckedChange", type: "(checked) => void", description: "Изменение" },
      { name: "label / description", type: "ReactNode", description: "Подпись и пояснение" },
      invalidProp,
    ],
    a11y: ["Пробел переключает", "Вся подпись кликабельна (label htmlFor)", "indeterminate озвучивается как «частично выбрано»"],
    figma: "12621:1669",
  },
  {
    slug: "radio",
    title: "RadioGroup",
    description: "Выбор строго одного варианта из группы.",
    entry: "radio.tsx",
    demo: "radio-demo",
    usage: `import { RadioGroup } from "@/components/ui/radio";

<RadioGroup value={format} onValueChange={setFormat} options={[{ value: "office", label: "Очно" }]} />`,
    props: [
      { name: "options", type: "{ value, label, description?, disabled? }[]", description: "Варианты" },
      { name: "value / defaultValue", type: "string", description: "Выбранное" },
      { name: "onValueChange", type: "(value: string) => void", description: "Выбор" },
      { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Направление" },
    ],
    a11y: ["Tab — в группу, стрелки — между вариантами", "role=radiogroup"],
    figma: "12531:2612",
  },
  {
    slug: "switch",
    title: "Switch",
    description: "Переключатель (бывший Toggle): мгновенно включает настройку, без кнопки «Сохранить».",
    entry: "switch.tsx",
    demo: "switch-demo",
    usage: `import { Switch } from "@/components/ui/switch";

<Switch label="Уведомления на почту" checked={on} onCheckedChange={setOn} />`,
    props: [
      { name: "checked / onCheckedChange", type: "boolean", description: "Состояние" },
      { name: "label / description", type: "ReactNode", description: "Подпись и пояснение" },
      { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "Размер" },
      { name: "labelPosition", type: `"left" | "right"`, default: `"right"`, description: "Подпись слева — для списков настроек" },
    ],
    dos: ["Для настроек, которые применяются сразу"],
    donts: ["Внутри формы с кнопкой «Сохранить» используйте Checkbox"],
    a11y: ["role=switch, aria-checked", "Пробел переключает"],
    figma: "12621:882",
  },

  /* ========================= Отображение данных ========================= */
  {
    slug: "avatar",
    title: "Avatar",
    isNew: true,
    description: "Фото пользователя или инициалы. Цвет инициалов стабилен для одного имени. Группа с «+N».",
    entry: "avatar.tsx",
    demo: "avatar-demo",
    usage: `import { Avatar } from "@/components/ui/avatar";

<Avatar name="Афанасьева Мария" src={user.photo} />`,
    props: [
      { name: "name", type: "string", description: "ФИО: инициалы и alt" },
      { name: "src", type: "string", description: "Фото (пока грузится — инициалы)" },
      { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl"`, default: `"md"`, description: "20 / 24 / 32 / 40 / 56" },
    ],
  },
  {
    slug: "status",
    title: "Status",
    description: "Статус объекта: заявки, практики, документа. 7 тонов, 3 варианта, точка или иконка.",
    entry: "status.tsx",
    demo: "status-demo",
    usage: `import { Status } from "@/components/ui/status";

<Status tone="success">Проходит практику</Status>`,
    props: [
      { name: "tone", type: `"neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent"`, default: `"neutral"`, description: "Смысл" },
      { name: "variant", type: `"subtle" | "solid"`, default: `"subtle"`, description: "Насыщенность" },
      { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "20 / 24px" },
      { name: "dot / icon", type: "boolean / ReactNode", description: "Индикатор перед текстом" },
    ],
    dos: ["Закрепите за каждым статусом бизнес-процесса один тон и используйте его везде"],
    donts: ["Не делайте статус кликабельным — для фильтров есть Tag"],
    figma: "12621:1681",
  },
  {
    slug: "tag",
    title: "Tag",
    description: "Метка: навык, фильтр, выбранное значение. Может быть выбираемой и удаляемой.",
    entry: "tag.tsx",
    demo: "tag-demo",
    usage: `import { Tag } from "@/components/ui/tag";

<Tag onRemove={() => remove(id)}>React</Tag>
<Tag selected={on} onClick={toggle}>SQL</Tag>`,
    props: [
      { name: "selected", type: "boolean", description: "Выбран (aria-pressed)" },
      { name: "onClick", type: "() => void", description: "Делает тег переключателем" },
      { name: "onRemove", type: "() => void", description: "Крестик удаления" },
      { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "24 / 28px" },
      { name: "icon", type: "ReactNode", description: "Иконка слева" },
    ],
    a11y: ["Выбираемый тег — кнопка с aria-pressed", "Крестик — отдельная кнопка «Удалить …»"],
    figma: "12621:1693",
  },
  {
    slug: "counter",
    title: "Counter",
    isNew: true,
    description: "Счётчик непрочитанного или точка-индикатор. Может крепиться к углу иконки или аватара.",
    entry: "counter.tsx",
    demo: "counter-demo",
    usage: `import { Counter } from "@/components/ui/counter";

<Counter count={7}>
  <Button iconOnly aria-label="Уведомления, новых: 7"><IconBell /></Button>
</Counter>`,
    props: [
      { name: "count", type: "number", description: "Число" },
      { name: "max", type: "number", default: "99", description: "Больше — «99+»" },
      { name: "dot", type: "boolean", description: "Только точка" },
      { name: "tone", type: `"danger" | "primary" | "neutral"`, default: `"danger"`, description: "Цвет" },
      { name: "children", type: "ReactNode", description: "Элемент, к которому крепится" },
    ],
  },
  {
    slug: "card",
    title: "Card",
    isNew: true,
    description: "Контейнер для группы связанного контента: шапка с действиями, содержимое, футер.",
    entry: "card.tsx",
    demo: "card-demo",
    wide: true,
    usage: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader action={<Button size="sm">Открыть</Button>}>
    <CardTitle>Летняя практика</CardTitle>
    <CardDescription>12 практикантов</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>`,
    props: [
      { name: "variant", type: `"elevated" | "filled"`, default: `"elevated"`, description: "Тень на фоне страницы или заливка внутри другой поверхности" },
      { name: "padding", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "16 / 24 / 32" },
      { name: "CardHeader.action", type: "ReactNode", description: "Кнопки или меню справа" },
    ],
  },
  {
    slug: "table",
    title: "Table",
    description: "Таблица: сортировка, выбор строк, плотность, загрузка, пустое состояние, закреплённые шапка и колонка, пагинация.",
    entry: "table.tsx",
    demo: "table-demo",
    wide: true,
    usage: `import { Table, type TableColumn } from "@/components/ui/table";

const columns: TableColumn<Row>[] = [
  { key: "name", title: "ФИО", sortable: true },
  { key: "status", title: "Статус", render: (r) => <Status tone="success">{r.status}</Status> },
];

<Table columns={columns} data={rows} rowKey={(r) => r.id} selectable pageSize={10} />

// Ячейки по типам из Figma
import { TableCellUser, TableCellDate } from "@/components/ui/table";
{ key: "user", title: "Практикант", render: (r) => <TableCellUser name={r.name} email={r.email} /> }`,
    examples: [
      { name: "table-cells", title: "Типы ячеек", description: "Готовые ячейки из Figma: TableCellUser (аватар + ФИО + email), TableCellRating, TableCellDocument, TableCellTags (+N), TableCellDate, Status, TableCellActions. Шапка — TableHeaderCell с сортировкой и чекбоксом." },
      { name: "table-density", title: "Плотность", description: "default 72px (как в Figma) · compact 48px." },
    ],
    props: [
      { name: "columns", type: "TableColumn<T>[]", description: "key, title, render?, sortable?, sortValue?, width?, align?, sticky?" },
      { name: "data / rowKey", type: "T[] / (row) => string", description: "Строки и ключ" },
      { name: "selectable / selected / onSelectedChange", type: "boolean / string[]", description: "Выбор строк" },
      { name: "pageSize / pageSizeOptions", type: "number / number[]", description: "Пагинация" },
      { name: "density", type: `"default" | "compact"`, default: `"default"`, description: "Высота строк: 72 или 48px" },
      { name: "TableHeaderCell / TableCell", type: "компоненты", description: "Ячейки шапки и тела — для своих таблиц без <Table>" },
      { name: "TableCellUser · Rating · Document · Tags · Date · Text · Actions", type: "компоненты", description: "Содержимое ячеек по типам из Figma — для render колонки" },
      { name: "loading", type: "boolean", description: "Скелетоны вместо строк" },
      { name: "empty", type: "ReactNode", description: "Своё пустое состояние" },
      { name: "onRowClick", type: "(row) => void", description: "Клик по строке" },
      { name: "maxHeight", type: "number | string", description: "Прокрутка с закреплённой шапкой" },
      { name: "caption", type: "string", description: "Название таблицы для скринридера" },
    ],
    dos: ["Числа выравнивайте вправо (align=\"right\")", "Действия со строкой — в меню ⋯ в закреплённой колонке"],
    a11y: ["aria-sort на сортируемых колонках", "Чекбоксы подписаны: «Выбрать строку», «Выбрать все»", "caption описывает таблицу"],
    figma: "12736:2878",
  },
  {
    slug: "accordion",
    title: "Accordion",
    isNew: true,
    description: "Раскрывающиеся секции: FAQ, детали заявки, группы настроек.",
    entry: "accordion.tsx",
    demo: "accordion-demo",
    usage: `import { Accordion } from "@/components/ui/accordion";

<Accordion items={[{ value: "1", title: "Вопрос", content: "Ответ" }]} />`,
    props: [
      { name: "items", type: "{ value, title, content, disabled? }[]", description: "Секции" },
      { name: "type", type: `"single" | "multiple"`, default: `"single"`, description: "Одна или несколько открытых" },
      { name: "variant", type: `"plain" | "card"`, default: `"plain"`, description: "Разделители или карточки" },
    ],
    a11y: ["Enter/Пробел — открыть, ↑/↓ — между заголовками", "aria-expanded, aria-controls"],
  },
  {
    slug: "empty-state",
    title: "EmptyState",
    isNew: true,
    description: "Пустое состояние: нет данных, ничего не найдено, нет доступа. С подсказкой, что делать дальше.",
    entry: "empty-state.tsx",
    demo: "empty-state-demo",
    wide: true,
    usage: `import { EmptyState } from "@/components/ui/empty-state";

<EmptyState title="Пока нет практикантов" action={<Button>Добавить</Button>} />`,
    props: [
      { name: "title / description", type: "ReactNode", description: "Что произошло и что делать" },
      { name: "icon", type: "ReactNode", default: "IconInbox", description: "Иконка" },
      { name: "action", type: "ReactNode", description: "Кнопки" },
      { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "Для таблиц — sm" },
    ],
  },
  {
    slug: "separator",
    title: "Separator",
    isNew: true,
    description: "Разделитель: горизонтальный, вертикальный или с подписью.",
    entry: "feedback.tsx",
    demo: "separator-demo",
    usage: `import { Separator } from "@/components/ui/feedback";

<Separator />
<Separator label="или" />`,
  },

  /* ============================ Обратная связь ============================ */
  {
    slug: "alert",
    title: "Alert",
    description: "Сообщение на странице (бывший Info field): заголовок, текст, действие, закрытие.",
    entry: "alert.tsx",
    demo: "alert-demo",
    usage: `import { Alert } from "@/components/ui/alert";

<Alert tone="warning" title="Осталось 3 дня">Отчёт ещё не отправлен</Alert>`,
    props: [
      { name: "tone", type: `"info" | "success" | "warning" | "danger"`, default: `"info"`, description: "Смысл" },
      { name: "title", type: "ReactNode", description: "Заголовок" },
      { name: "icon", type: "boolean | ReactNode", default: "true", description: "Иконка тона или своя" },
      { name: "action", type: "ReactNode", description: "Кнопка справа" },
      { name: "onClose", type: "() => void", description: "Крестик" },
    ],
    dos: ["Alert — для постоянного сообщения в контексте страницы", "Для результата действия — Toast"],
    a11y: ["danger и warning — role=alert, остальные — role=status"],
    figma: "12736:2735",
  },
  {
    slug: "toast",
    title: "Toast",
    description: "Всплывающее уведомление о результате действия. Пауза при наведении, действие «Отменить».",
    entry: "toast.tsx",
    demo: "toast-demo",
    usage: `import { Toaster, toast } from "@/components/ui/toast";

// один раз в корне приложения
<Toaster />

toast({ tone: "success", title: "Отчёт отправлен" });`,
    props: [
      { name: "tone", type: `"success" | "danger" | "warning" | "info"`, default: `"success"`, description: "Тип" },
      { name: "title / description", type: "ReactNode", description: "Текст" },
      { name: "action", type: "{ label, onClick }", description: "Кнопка действия" },
      { name: "duration", type: "number", default: "5000 (danger — 8000)", description: "мс, 0 — не скрывать" },
      { name: "Toaster.position", type: `"bottom-right" | "top-right" | "top-center" | "bottom-center"`, default: `"bottom-right"`, description: "Позиция" },
    ],
    a11y: ["Контейнер — aria-live=polite, ошибки — role=alert", "Таймер останавливается при наведении и фокусе"],
    figma: "12621:1736",
  },
  {
    slug: "progress",
    title: "Progress",
    isNew: true,
    description: "Прогресс известной длительности: загрузка, прохождение практики, лимиты.",
    entry: "feedback.tsx",
    demo: "progress-demo",
    usage: `import { Progress } from "@/components/ui/feedback";

<Progress value={64} label="Прохождение" showValue />`,
    props: [
      { name: "value", type: "number", description: "0–100" },
      { name: "tone", type: `"primary" | "success" | "warning" | "danger"`, default: `"primary"`, description: "Цвет" },
      { name: "label / showValue", type: "ReactNode / boolean", description: "Подпись и процент" },
      { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "4 / 8px" },
    ],
  },
  {
    slug: "spinner",
    title: "Spinner",
    isNew: true,
    description: "Индикатор загрузки неизвестной длительности.",
    entry: "feedback.tsx",
    demo: "spinner-demo",
    usage: `import { Spinner } from "@/components/ui/feedback";

<Spinner label="Загружаем практикантов" />`,
    donts: ["Для загрузки списков и карточек лучше Skeleton — он показывает будущую форму"],
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    isNew: true,
    description: "Заглушка контента во время загрузки: повторяет форму будущих данных.",
    entry: "feedback.tsx",
    demo: "skeleton-demo",
    usage: `import { Skeleton } from "@/components/ui/feedback";

<Skeleton width="60%" height={14} />
<Skeleton circle height={40} />`,
  },

  /* ================================ Оверлеи ================================ */
  {
    slug: "modal",
    title: "Modal",
    description: "Модальное окно на Radix Dialog: ловушка фокуса, Esc, блокировка прокрутки, 4 размера.",
    entry: "modal.tsx",
    demo: "modal-demo",
    usage: `import { Modal, ModalClose } from "@/components/ui/modal";

<Modal open={open} onOpenChange={setOpen} title="Удалить?" footer={<Button tone="danger">Удалить</Button>}>
  …
</Modal>`,
    examples: [
      { name: "modal-form", title: "Форма в модалке", description: "dismissible={false} — клик по фону не закроет окно с несохранёнными данными." },
      { name: "modal-steps", title: "Пошаговая (онбординг)", description: "ModalSteps — индикатор шагов." },
    ],
    props: [
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Управление" },
      { name: "title / description", type: "ReactNode", description: "Заголовок и пояснение (aria-labelledby/describedby)" },
      { name: "footer", type: "ReactNode", description: "Кнопки. Главное действие — справа" },
      { name: "size", type: `"sm" | "md" | "lg" | "xl"`, default: `"md"`, description: "400 / 520 / 720 / 960px" },
      { name: "trigger", type: "ReactNode", description: "Кнопка открытия" },
      { name: "closable / dismissible", type: "boolean", default: "true", description: "Крестик / закрытие по фону" },
    ],
    a11y: ["Фокус переходит в окно и возвращается на кнопку после закрытия", "Tab не выходит за пределы окна", "Esc закрывает"],
    figma: "12737:114",
  },
  {
    slug: "popover",
    title: "Popover",
    isNew: true,
    description: "Панель по клику: фильтры, быстрые формы, подробности. Может содержать интерактивные элементы.",
    entry: "popover.tsx",
    demo: "popover-demo",
    usage: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild><Button>Фильтры</Button></PopoverTrigger>
  <PopoverContent title="Фильтры">…</PopoverContent>
</Popover>`,
    dos: ["Popover — для интерактивного содержимого", "Tooltip — только для коротких подсказок"],
  },
  {
    slug: "dropdown-menu",
    title: "DropdownMenu",
    description: "Меню действий: ⋯ в строке таблицы, меню пользователя. Иконки, сочетания клавиш, чекбоксы, опасные пункты.",
    entry: "dropdown-menu.tsx",
    demo: "dropdown-menu-demo",
    usage: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button iconOnly aria-label="Действия"><IconDots /></Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem icon={<IconPen />}>Редактировать</DropdownMenuItem>
    <DropdownMenuItem danger>Удалить</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    a11y: ["↑/↓, Home/End, буква — навигация; Enter — выбор; Esc — закрыть", "role=menu / menuitem"],
    figma: "12621:881",
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "Короткая подсказка по наведению и фокусу с клавиатуры. С позиционированием и стрелкой.",
    entry: "tooltip.tsx",
    demo: "tooltip-demo",
    usage: `import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

<TooltipProvider>  {/* один раз в корне */}
  <Tooltip content="Редактировать"><Button iconOnly aria-label="Редактировать"><IconPen /></Button></Tooltip>
</TooltipProvider>`,
    donts: ["Не кладите в тултип важную информацию и ссылки — на телефоне его не увидят"],
    a11y: ["Появляется и при фокусе с клавиатуры", "Связан с элементом через aria-describedby"],
    figma: "12531:2617",
  },

  /* =============================== Навигация =============================== */
  {
    slug: "tabs",
    title: "Tabs",
    description: "Вкладки: underline — разделы страницы, pill — переключатель вида или периода. Счётчики, клавиатура.",
    entry: "tabs.tsx",
    demo: "tabs-demo",
    usage: `import { Tabs } from "@/components/ui/tabs";

<Tabs items={[{ value: "all", label: "Все", count: 27, content: <List /> }]} />`,
    examples: [{ name: "tabs-pill", title: "Pill", description: "Сегментированный переключатель." }],
    props: [
      { name: "items", type: "{ value, label, count?, disabled?, content? }[]", description: "Вкладки" },
      { name: "value / defaultValue / onValueChange", type: "string", description: "Активная вкладка" },
      { name: "variant", type: `"underline" | "pill"`, default: `"underline"`, description: "Вид" },
      { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "Размер" },
      { name: "fullWidth", type: "boolean", description: "Вкладки на всю ширину" },
    ],
    a11y: ["←/→, Home/End — между вкладками", "role=tablist / tab / tabpanel"],
    figma: "12531:2615",
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    isNew: true,
    description: "Хлебные крошки: путь до текущей страницы, длинный путь сворачивается.",
    entry: "breadcrumb.tsx",
    demo: "breadcrumb-demo",
    usage: `import { Breadcrumb } from "@/components/ui/breadcrumb";

<Breadcrumb items={[{ label: "Практиканты", href: "/students" }, { label: "Комарова Е." }]} />`,
    props: [
      { name: "items", type: "{ label, href?, onClick? }[]", description: "Последний пункт — текущая страница" },
      { name: "maxItems", type: "number", default: "4", description: "Сворачивает середину в «…»" },
    ],
    a11y: ["nav aria-label, aria-current=page у текущей"],
  },
  {
    slug: "pagination",
    title: "Pagination",
    isNew: true,
    description: "Постраничная навигация. Встроена в Table, можно использовать отдельно.",
    entry: "pagination.tsx",
    demo: "pagination-demo",
    usage: `import { Pagination } from "@/components/ui/pagination";

<Pagination page={page} pageCount={20} onPageChange={setPage} />`,
    props: [
      { name: "page / pageCount / onPageChange", type: "number", description: "Текущая, всего, переход" },
      { name: "siblings", type: "number", default: "1", description: "Соседние страницы" },
      { name: "size", type: `"sm" | "md"`, default: `"md"`, description: "28 / 32px" },
    ],
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    description: "Боковая навигация: наборы пунктов по ролям (администратор, наставник, практикант), счётчики, сворачивание до иконок, поддержка. Логотип — только в Header.",
    entry: "sidebar.tsx",
    demo: "sidebar-demo",
    usage: `import { Sidebar } from "@/components/ui/sidebar";

<Sidebar role="mentor" activeKey={route} onSelect={navigate} />

// Свои пункты
<Sidebar items={nav} activeKey={route} onSelect={navigate} />`,
    props: [
      { name: "role", type: `"admin" | "mentor" | "student"`, description: "Пункты меню роли из макета (sidebarRoleItems)" },
      { name: "items / groups", type: "SidebarNavItem[] / { title?, items }[]", description: "Свои пункты или группы вместо role" },
      { name: "activeKey / onSelect", type: "string / (key) => void", description: "Активный пункт" },
      { name: "collapsed / onCollapsedChange", type: "boolean", description: "Свёрнутый вид" },
    ],
    a11y: ["aria-current=page у активного пункта", "В свёрнутом виде у пунктов aria-label и title"],
    figma: "12531:2619",
  },
  {
    slug: "header",
    title: "Header",
    description: "Шапка приложения: логотип, действия, колокольчик и аватар. ФИО и роль — в меню под аватаром: Профиль, Уведомления со счётчиком, Выйти.",
    entry: "header.tsx",
    demo: "header-demo",
    wide: true,
    usage: `import { Header } from "@/components/ui/header";

<Header userName="Афанасьева Мария" userRole="Наставник" notifications={3} onLogout={logout} />`,
    props: [
      { name: "userName / userRole / avatarSrc", type: "string", description: "Пользователь: в шапке только аватар, ФИО и роль — в меню" },
      { name: "notifications", type: "number", description: "Точка на колокольчике и счётчик в пункте «Уведомления»" },
      { name: "onNotificationsClick / onProfileClick / onLogout", type: "() => void", description: "Пункты меню и колокольчик" },
      { name: "userMenu", type: "ReactNode", description: "Дополнительные DropdownMenuItem перед «Выйти»" },
      { name: "actions", type: "ReactNode", description: "HeaderAction (иконки) или HeaderLink (текст)" },
      { name: "logo / homeHref", type: "ReactNode / string", description: "Логотип (по умолчанию «ПроДвижение») и ссылка" },
    ],
    figma: "9033:4793",
  },
  {
    slug: "footer",
    title: "Footer",
    description: "Подвал: правовая информация и ссылки.",
    entry: "footer.tsx",
    demo: "footer-demo",
    wide: true,
    usage: `import { Footer } from "@/components/ui/footer";

<Footer links={[{ label: "Cookie", href: "/cookie" }]} />`,
    figma: "12531:2618",
  },

  /* ========================= Блоки «ПроДвижение» ========================= */
  {
    slug: "timeline",
    title: "Timeline",
    description: "Таймлайн этапов практики. Собран из TimelineStep и ProgressStep.",
    entry: "timeline.tsx",
    demo: "timeline-demo",
    wide: true,
    usage: `import { Timeline } from "@/components/ui/timeline";

<Timeline current={2} steps={[{ title: "Загрузка документов" }, { title: "Оценка" }]} />`,
    examples: [{ name: "timeline-steps", title: "ProgressStep и TimelineStep" }],
    figma: "13250:5011",
  },
  {
    slug: "approval",
    title: "Approval history",
    description: "Лента «Ход согласования»: новые события внизу, затухание сверху.",
    entry: "approval.tsx",
    demo: "approval-demo",
    usage: `import { ApprovalHistory } from "@/components/ui/approval";

<ApprovalHistory events={[{ status: "approved", title: "Наставник согласовал", date: "27.06.2024" }]} />`,
    examples: [{ name: "approval-parts", title: "Составные части" }],
    figma: "13250:2745",
  },
  {
    slug: "notification",
    title: "Notification",
    description: "Пункт ленты уведомлений: заголовок, текст, время, непрочитанное, действие.",
    entry: "notification-item.tsx",
    demo: "notification-demo",
    usage: `import { NotificationItem, NotificationList } from "@/components/ui/notification-item";

<NotificationList>
  <NotificationItem title="Отчёт согласован" time="2 ч назад" unread />
</NotificationList>`,
    figma: "12621:1986",
  },
];

export const foundations: NavItem[] = [
  { slug: "tokens", title: "Токены и темы" },
  { slug: "colors", title: "Цвета" },
  { slug: "typography", title: "Типографика" },
  { slug: "spacing", title: "Отступы и размеры" },
  { slug: "effects", title: "Радиусы, тени, движение" },
  { slug: "icons", title: "Иконки" },
];

const pick = (...slugs: string[]) =>
  slugs.map((s) => {
    const c = components.find((x) => x.slug === s)!;
    return { slug: `components/${c.slug}`, title: c.title, badge: c.isNew ? "new" : undefined };
  });

export const nav: NavGroup[] = [
  {
    title: "Начало работы",
    items: [
      { slug: "", title: "Введение" },
      { slug: "installation", title: "Установка" },
      { slug: "principles", title: "Принципы" },
    ],
  },
  { title: "Основы", items: foundations.map((f) => ({ slug: `foundations/${f.slug}`, title: f.title })) },
  { title: "Формы", items: pick("button", "field", "input", "textarea", "search", "select", "multi-select", "checkbox", "radio", "switch") },
  { title: "Отображение данных", items: pick("avatar", "status", "tag", "counter", "card", "table", "accordion", "empty-state", "separator") },
  { title: "Обратная связь", items: pick("alert", "toast", "progress", "spinner", "skeleton") },
  { title: "Оверлеи", items: pick("modal", "popover", "dropdown-menu", "tooltip") },
  { title: "Навигация", items: pick("tabs", "breadcrumb", "pagination", "sidebar", "header", "footer") },
  { title: "Блоки «ПроДвижение»", items: pick("timeline", "approval", "notification") },
];

export const flatNav: NavItem[] = nav.flatMap((g) => g.items);
