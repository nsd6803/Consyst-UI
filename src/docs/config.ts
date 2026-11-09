export type PropDoc = { name: string; type: string; default?: string; description: string };
export type ExampleDoc = { name: string; title: string; description?: string };

export type ComponentDoc = {
  slug: string;
  title: string;
  description: string;
  /** Файлы из src/registry, которые нужно скопировать (в порядке показа) */
  files: string[];
  /** Пример для главного превью */
  demo: string;
  usage: string;
  examples?: ExampleDoc[];
  props?: PropDoc[];
  /** id ноды в Figma */
  figma?: string;
  /** Широкое превью (таблица, шапка) */
  wide?: boolean;
};

export type NavItem = { slug: string; title: string };
export type NavGroup = { title: string; items: NavItem[] };

export const FIGMA_FILE = "https://www.figma.com/design/PmDgV8oNrgYoOvoa3lBdXl/Consyst-UI";
export const figmaLink = (node?: string) => (node ? `${FIGMA_FILE}?node-id=${node.replace(":", "-")}` : FIGMA_FILE);

export const components: ComponentDoc[] = [
  /* ------------------------------ Ввод ------------------------------ */
  {
    slug: "button",
    title: "Button",
    description:
      "Интерактивный элемент для запуска действий. 4 варианта (fill, secondary, ghost, text), 5 цветов и 4 размера.",
    files: ["button.tsx", "button.css"],
    demo: "button-demo",
    usage: `import { Button } from "@/components/ui/button";

<Button variant="fill" color="primary" size="medium">
  Сохранить
</Button>`,
    examples: [
      { name: "button-variants", title: "Варианты", description: "Залитая, полупрозрачная, контурная и текстовая." },
      { name: "button-colors", title: "Цвета", description: "primary, neutral, error, warning, success — для каждого варианта." },
      { name: "button-sizes", title: "Размеры", description: "large (48–60px), medium (40–48px), small (32–37px), tiny (26–28px). Кнопка-иконка — проп iconOnly." },
      { name: "button-disabled", title: "Disabled", description: "Прозрачность 40%, курсор not-allowed." },
    ],
    props: [
      { name: "variant", type: `"fill" | "secondary" | "ghost" | "text"`, default: `"fill"`, description: "Визуальный вариант" },
      { name: "color", type: `"primary" | "neutral" | "error" | "warning" | "success"`, default: `"primary"`, description: "Цвет" },
      { name: "size", type: `"large" | "medium" | "small" | "tiny"`, default: `"medium"`, description: "Размер" },
      { name: "leftIcon / rightIcon", type: "ReactNode", description: "Иконки слева и справа от текста" },
      { name: "iconOnly", type: "boolean", default: "false", description: "Квадратная кнопка с иконкой в children" },
      { name: "fullWidth", type: "boolean", default: "false", description: "Растянуть на всю ширину" },
      { name: "...props", type: "ButtonHTMLAttributes", description: "Все атрибуты <button>: onClick, disabled, type…" },
    ],
    figma: "12621:1663",
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "Элемент выбора, позволяющий независимо включать или отключать один или несколько параметров из списка.",
    files: ["checkbox.tsx", "checkbox.css", "icons.tsx"],
    demo: "checkbox-demo",
    usage: `import { Checkbox } from "@/components/ui/checkbox";

<Checkbox label="Согласен с условиями" checked={checked} onChange={(e) => setChecked(e.target.checked)} />`,
    props: [
      { name: "label", type: "ReactNode", description: "Подпись справа" },
      { name: "indeterminate", type: "boolean", default: "false", description: "Частичный выбор (минус вместо галочки)" },
      { name: "checked / defaultChecked", type: "boolean", description: "Состояние, как у обычного input" },
      { name: "...props", type: "InputHTMLAttributes", description: "onChange, disabled, name…" },
    ],
    figma: "12621:1669",
  },
  {
    slug: "radio",
    title: "Radio",
    description: "Элемент выбора, позволяющий выбрать строго один вариант из взаимоисключающей группы опций.",
    files: ["radio.tsx", "radio.css"],
    demo: "radio-demo",
    usage: `import { Radio, RadioGroup } from "@/components/ui/radio";

<RadioGroup
  name="format"
  defaultValue="office"
  options={[
    { value: "office", label: "Очно" },
    { value: "remote", label: "Удалённо" },
  ]}
/>`,
    props: [
      { name: "name", type: "string", description: "RadioGroup: имя группы" },
      { name: "options", type: "{ value, label, disabled? }[]", description: "RadioGroup: варианты" },
      { name: "value / defaultValue", type: "string", description: "RadioGroup: выбранное значение" },
      { name: "onChange", type: "(value: string) => void", description: "RadioGroup: колбэк выбора" },
      { name: "direction", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "RadioGroup: направление" },
    ],
    figma: "12531:2612",
  },
  {
    slug: "toggle",
    title: "Toggle",
    description: "Переключатель бинарного состояния (вкл/выкл) для мгновенного изменения настройки без подтверждения.",
    files: ["toggle.tsx", "toggle.css"],
    demo: "toggle-demo",
    usage: `import { Toggle } from "@/components/ui/toggle";

<Toggle label="Уведомления" checked={on} onCheckedChange={setOn} />`,
    props: [
      { name: "checked / defaultChecked", type: "boolean", description: "Состояние" },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Колбэк переключения" },
      { name: "label", type: "ReactNode", description: "Подпись справа" },
      { name: "disabled", type: "boolean", description: "Отключить" },
    ],
    figma: "12621:882",
  },
  {
    slug: "input",
    title: "Text input",
    description:
      "Однострочное поле ввода. Подпись работает как плейсхолдер и поднимается на рамку при вводе. Поддерживает иконку, очистку и ошибку.",
    files: ["input.tsx", "input.css", "icons.tsx"],
    demo: "input-demo",
    usage: `import { Input } from "@/components/ui/input";

<Input label="ФИО" value={name} onChange={(e) => setName(e.target.value)} error={error} />`,
    props: [
      { name: "label", type: "string", description: "Плавающая подпись" },
      { name: "error", type: "string", description: "Текст ошибки, подсвечивает поле красным" },
      { name: "icon", type: "ReactNode", description: "Иконка справа" },
      { name: "clearable", type: "boolean", default: "true", description: "Кнопка очистки при заполненном поле" },
      { name: "onClear", type: "() => void", description: "Колбэк очистки (для контролируемого поля)" },
      { name: "...props", type: "InputHTMLAttributes", description: "value, onChange, disabled, type…" },
    ],
    figma: "12531:2613",
  },
  {
    slug: "textarea",
    title: "Text area",
    description: "Многострочное поле ввода для длинного произвольного текста со счётчиком символов и изменением размера.",
    files: ["textarea.tsx", "textarea.css", "input.css"],
    demo: "textarea-demo",
    usage: `import { Textarea } from "@/components/ui/textarea";

<Textarea label="Комментарий" maxLength={256} />`,
    props: [
      { name: "label", type: "string", description: "Плавающая подпись" },
      { name: "error", type: "string", description: "Текст ошибки" },
      { name: "maxLength", type: "number", default: "256", description: "Лимит символов" },
      { name: "showCount", type: "boolean", default: "true", description: "Показывать счётчик 0/256" },
    ],
    figma: "12531:2613",
  },
  {
    slug: "search",
    title: "Search",
    description: "Поле ввода с иконкой поиска для фильтрации и нахождения контента внутри платформы. Два размера.",
    files: ["search.tsx", "search.css", "input.css", "icons.tsx"],
    demo: "search-demo",
    usage: `import { Search } from "@/components/ui/search";

<Search placeholder="Поиск по ФИО" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ("")} />`,
    props: [
      { name: "size", type: `"medium" | "small"`, default: `"medium"`, description: "Размер" },
      { name: "error", type: "string", description: "Текст ошибки" },
      { name: "onClear", type: "() => void", description: "Колбэк кнопки очистки" },
    ],
    figma: "12531:2613",
  },
  {
    slug: "dropdown",
    title: "Dropdown",
    description:
      "Раскрывающийся список: триггер, контейнер меню (DropdownMenu) и пункты (DropdownItem). Одиночный и множественный выбор, поиск, сброс.",
    files: ["dropdown.tsx", "dropdown.css", "checkbox.css", "icons.tsx"],
    demo: "dropdown-demo",
    usage: `import { Dropdown } from "@/components/ui/dropdown";

<Dropdown
  placeholder="Выберите ВУЗ"
  options={[{ value: "mirea", label: "РТУ МИРЭА" }]}
  onChange={(value) => console.log(value)}
/>`,
    examples: [
      { name: "dropdown-multiple", title: "Множественный выбор", description: "multiple + searchable + resettable — фильтр по статусам." },
      { name: "dropdown-menu", title: "Меню действий", description: "Примитивы DropdownMenu и DropdownItem для собственных меню." },
    ],
    props: [
      { name: "options", type: "{ value: string; label: string }[]", description: "Пункты списка" },
      { name: "multiple", type: "boolean", default: "false", description: "Множественный выбор (value — string[])" },
      { name: "value / defaultValue", type: "string | null | string[]", description: "Выбранное значение" },
      { name: "onChange", type: "(value) => void", description: "Колбэк выбора" },
      { name: "searchable", type: "boolean", default: "false", description: "Поиск внутри списка" },
      { name: "resettable", type: "boolean", default: "false", description: "Кнопка «Сбросить»" },
      { name: "placeholder", type: "string", default: `"Выберите"`, description: "Текст пустого триггера" },
    ],
    figma: "12621:881",
  },

  /* ------------------------- Отображение данных ------------------------- */
  {
    slug: "status",
    title: "Status",
    description: "Индикатор текущего состояния объекта (active, pending, error и др.) в виде цветового бейджа.",
    files: ["status.tsx", "status.css"],
    demo: "status-demo",
    usage: `import { Status } from "@/components/ui/status";

<Status state="success">Проходит практику</Status>`,
    props: [
      { name: "state", type: `"success" | "error" | "info" | "warning" | "default"`, default: `"default"`, description: "Цвет статуса" },
      { name: "icon", type: "ReactNode", description: "Иконка перед текстом" },
    ],
    figma: "12621:1681",
  },
  {
    slug: "tag",
    title: "Tag",
    description: "Компактная метка, например для навыков пользователей. Может быть выбранной и редактируемой.",
    files: ["tag.tsx", "tag.css", "icons.tsx"],
    demo: "tag-demo",
    usage: `import { Tag } from "@/components/ui/tag";

<Tag state="active" onRemove={() => remove(id)}>React</Tag>`,
    props: [
      { name: "state", type: `"default" | "active" | "inactive"`, default: `"default"`, description: "Состояние" },
      { name: "onEdit", type: "() => void", description: "Показывает кнопку-карандаш при наведении" },
      { name: "onRemove", type: "() => void", description: "Показывает кнопку удаления при наведении" },
    ],
    figma: "12621:1693",
  },
  {
    slug: "info-field",
    title: "Info field",
    description: "Информационное поле для предупреждающих сообщений. Каждый статус имеет свой цвет и иконку.",
    files: ["info-field.tsx", "info-field.css", "icons.tsx"],
    demo: "info-field-demo",
    usage: `import { InfoField } from "@/components/ui/info-field";

<InfoField type="warning">Осталось 3 дня до дедлайна</InfoField>`,
    props: [
      { name: "type", type: `"success" | "error" | "info" | "warning"`, default: `"info"`, description: "Статус" },
      { name: "icon", type: "boolean | ReactNode", default: "true", description: "Иконка статуса или своя иконка" },
    ],
    figma: "12736:2735",
  },
  {
    slug: "notification",
    title: "Notification",
    description: "Встроенное сообщение в списке уведомлений: о статусе действия, ошибке или важном событии.",
    files: ["notification-item.tsx", "notification-item.css", "icons.tsx"],
    demo: "notification-demo",
    usage: `import { NotificationItem, NotificationList } from "@/components/ui/notification-item";

<NotificationList>
  <NotificationItem title="Отчёт согласован" time="2 ч назад" unread />
</NotificationList>`,
    props: [
      { name: "title", type: "ReactNode", description: "Заголовок" },
      { name: "description", type: "ReactNode", description: "Текст" },
      { name: "time", type: "ReactNode", description: "Время события" },
      { name: "unread", type: "boolean", default: "false", description: "Красная точка у времени" },
      { name: "icon", type: "ReactNode", description: "Иконка в кружке" },
      { name: "action", type: "ReactNode", description: "Кнопка под текстом" },
    ],
    figma: "12621:1986",
  },
  {
    slug: "table",
    title: "Table",
    description:
      "Таблица с сортировкой, выбором строк, закреплённой колонкой действий и пагинацией. Ячейки рендерятся любыми компонентами.",
    files: ["table.tsx", "table.css", "checkbox.css", "icons.tsx"],
    demo: "table-demo",
    wide: true,
    usage: `import { Table, type TableColumn } from "@/components/ui/table";

const columns: TableColumn<Row>[] = [
  { key: "name", title: "ФИО", sortable: true },
  { key: "status", title: "Статус", render: (r) => <Status state="success">{r.status}</Status> },
];

<Table columns={columns} data={rows} rowKey={(r) => r.id} selectable pageSize={10} />`,
    props: [
      { name: "columns", type: "TableColumn<T>[]", description: "key, title, render?, sortable?, sortValue?, width?, align?, sticky?" },
      { name: "data", type: "T[]", description: "Строки" },
      { name: "rowKey", type: "(row: T) => string", description: "Уникальный ключ строки" },
      { name: "selectable", type: "boolean", default: "false", description: "Колонка чекбоксов" },
      { name: "selected / onSelectedChange", type: "string[]", description: "Контролируемый выбор" },
      { name: "pageSize", type: "number", description: "Включает пагинацию" },
      { name: "pageSizeOptions", type: "number[]", default: "[10, 20, 50]", description: "Варианты «N элементов»" },
    ],
    figma: "12736:2878",
  },
  {
    slug: "timeline",
    title: "Timeline",
    description:
      "Таймлайн этапов практики. Собран из TimelineStep, который в свою очередь использует ProgressStep. Прогресс задаётся индексом текущего этапа.",
    files: ["timeline.tsx", "timeline.css"],
    demo: "timeline-demo",
    wide: true,
    usage: `import { Timeline } from "@/components/ui/timeline";

<Timeline current={2} steps={[{ title: "Загрузка документов" }, { title: "Оценка" }]} />`,
    examples: [
      { name: "timeline-steps", title: "Progress step и Timeline step", description: "Статусы done / current / next в обычном и активном состоянии." },
    ],
    props: [
      { name: "steps", type: "{ title; dates? }[]", description: "Этапы" },
      { name: "current", type: "number", description: "Индекс текущего этапа (с 0)" },
      { name: "selected / onSelect", type: "number / (i) => void", description: "Выбранный этап" },
      { name: "bordered", type: "boolean", default: "true", description: "Карточка с рамкой и тенью" },
    ],
    figma: "13250:5011",
  },
  {
    slug: "approval",
    title: "Approval history",
    description:
      "Блок «Ход согласования» — лента событий. Новые события внизу, лента прижата к низу и плавно затухает сверху.",
    files: ["approval.tsx", "approval.css", "icons.tsx"],
    demo: "approval-demo",
    usage: `import { ApprovalHistory } from "@/components/ui/approval";

<ApprovalHistory
  events={[
    { status: "neutral", title: "Практикант направил задание", date: "26.06.2024 12:20" },
    { status: "approved", title: "Наставник согласовал", date: "27.06.2024 09:00" },
  ]}
/>`,
    examples: [{ name: "approval-parts", title: "Составные части", description: "ApprovalMarker, ApprovalComment и ApprovalEvent можно использовать отдельно." }],
    props: [
      { name: "events", type: "ApprovalEventProps[]", description: "status, title, date, comment?" },
      { name: "title", type: "ReactNode", default: `"Ход согласования"`, description: "Заголовок" },
      { name: "height", type: "number", default: "360", description: "Фиксированная высота ленты" },
    ],
    figma: "13250:2745",
  },

  /* ------------------------------ Оверлеи ------------------------------ */
  {
    slug: "toast",
    title: "Toast",
    description:
      "Всплывающее уведомление поверх интерфейса, информирующее о результате действия без прерывания рабочего процесса.",
    files: ["toast.tsx", "toast.css", "icons.tsx"],
    demo: "toast-demo",
    usage: `import { Toaster, toast } from "@/components/ui/toast";

// один раз в корне приложения
<Toaster />

// в любом месте
toast({ type: "success", title: "Отчёт отправлен" });`,
    examples: [{ name: "toast-static", title: "Статичный Toast", description: "Компонент можно рендерить и без Toaster." }],
    props: [
      { name: "type", type: `"success" | "error" | "info" | "warning"`, default: `"success"`, description: "Тип и цвет иконки" },
      { name: "title", type: "ReactNode", description: "Заголовок" },
      { name: "description", type: "ReactNode", description: "Текст" },
      { name: "duration", type: "number", default: "4000", description: "toast(): время показа, 0 — не скрывать" },
      { name: "position", type: `"top-right" | "bottom-right" | …`, default: `"bottom-right"`, description: "Toaster: позиция" },
    ],
    figma: "12621:1736",
  },
  {
    slug: "modal",
    title: "Modal",
    description: "Модальное окно с заголовком, контентом и кнопками. Закрывается по Esc, крестику и клику на фон.",
    files: ["modal.tsx", "modal.css", "icons.tsx"],
    demo: "modal-demo",
    usage: `import { Modal } from "@/components/ui/modal";

<Modal open={open} onClose={() => setOpen(false)} title="Заголовок" footer={<Button>Ок</Button>}>
  Текст модального окна
</Modal>`,
    examples: [{ name: "modal-steps", title: "Пошаговая модалка", description: "Онбординг с индикатором шагов ModalSteps." }],
    props: [
      { name: "open", type: "boolean", description: "Открыто ли окно" },
      { name: "onClose", type: "() => void", description: "Закрытие" },
      { name: "title", type: "ReactNode", description: "Заголовок (Rosatom)" },
      { name: "footer", type: "ReactNode", description: "Кнопки внизу, растягиваются поровну" },
      { name: "closable", type: "boolean", default: "true", description: "Крестик в углу" },
      { name: "closeOnOverlay", type: "boolean", default: "true", description: "Закрытие кликом по фону" },
      { name: "width", type: "number | string", default: "500", description: "Ширина окна" },
    ],
    figma: "12737:114",
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "Небольшая подсказка, появляющаяся при наведении на элемент и раскрывающая его назначение.",
    files: ["tooltip.tsx", "tooltip.css"],
    demo: "tooltip-demo",
    usage: `import { Tooltip } from "@/components/ui/tooltip";

<Tooltip content="Скачать отчёт">
  <Button>Скачать</Button>
</Tooltip>`,
    props: [
      { name: "content", type: "ReactNode", description: "Текст подсказки" },
      { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"top"`, description: "Сторона" },
      { name: "delay", type: "number", default: "150", description: "Задержка появления, мс" },
    ],
    figma: "12531:2617",
  },

  /* ----------------------------- Навигация ----------------------------- */
  {
    slug: "header",
    title: "Header",
    description: "Верхняя панель платформы с логотипом, основной навигацией и глобальными действиями пользователя.",
    files: ["header.tsx", "header.css", "icons.tsx"],
    demo: "header-demo",
    wide: true,
    usage: `import { Header, HeaderLink } from "@/components/ui/header";

<Header productName="ПроДвижение" avatarSrc={user.photo} actions={<HeaderLink>Создать отчёт</HeaderLink>} />`,
    props: [
      { name: "productName", type: "ReactNode", default: `"ПроДвижение"`, description: "Название рядом с логотипом" },
      { name: "logo", type: "ReactNode", description: "Иконка логотипа" },
      { name: "actions", type: "ReactNode", description: "HeaderAction (иконки) или HeaderLink (текст)" },
      { name: "avatarSrc / userName", type: "string", description: "Аватар или инициалы" },
      { name: "hasNotifications", type: "boolean", description: "Красная точка на колокольчике" },
    ],
    figma: "9033:4793",
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    description: "Боковая панель навигации с пунктами меню, поддержкой и сворачиванием до иконок.",
    files: ["sidebar.tsx", "sidebar.css", "icons.tsx"],
    demo: "sidebar-demo",
    usage: `import { Sidebar } from "@/components/ui/sidebar";

<Sidebar items={[{ key: "home", icon: <IconHome />, label: "Главная" }]} activeKey="home" onSelect={navigate} />`,
    examples: [{ name: "sidebar-item-demo", title: "Sidebar menu item", description: "Default, hover, active; со счётчиком; свёрнутый вид с точкой." }],
    props: [
      { name: "items", type: "{ key, icon, label, badge? }[]", description: "Пункты меню" },
      { name: "activeKey", type: "string", description: "Активный пункт" },
      { name: "onSelect", type: "(key: string) => void", description: "Переход" },
      { name: "collapsed / onCollapsedChange", type: "boolean", description: "Свёрнутое состояние" },
    ],
    figma: "12531:2619",
  },
  {
    slug: "tabs",
    title: "Tabs",
    description:
      "Табы для переключения между связанными представлениями. Два варианта: строка с подчёркиванием и сегментированный контейнер.",
    files: ["tabs.tsx", "tabs.css"],
    demo: "tabs-demo",
    usage: `import { Tabs } from "@/components/ui/tabs";

<Tabs items={[{ value: "a", label: "Активные" }, { value: "b", label: "Архив" }]} value={tab} onChange={setTab} />`,
    examples: [{ name: "tabs-pill", title: "Pill", description: "variant=\"pill\" — активная вкладка выделена заливкой." }],
    props: [
      { name: "items", type: "{ value, label, disabled? }[]", description: "Вкладки" },
      { name: "value / defaultValue", type: "string", description: "Активная вкладка" },
      { name: "onChange", type: "(value: string) => void", description: "Переключение" },
      { name: "variant", type: `"underline" | "pill"`, default: `"underline"`, description: "Вариант" },
    ],
    figma: "12531:2615",
  },
  {
    slug: "footer",
    title: "Footer",
    description: "Нижняя секция страницы со вспомогательной навигацией, правовой информацией и ссылками.",
    files: ["footer.tsx", "footer.css"],
    demo: "footer-demo",
    wide: true,
    usage: `import { Footer } from "@/components/ui/footer";

<Footer links={[{ label: "Cookie", href: "/cookie" }]} />`,
    props: [
      { name: "copyright", type: "ReactNode", default: `"АО «Консист-ОС» <год>"`, description: "Текст слева" },
      { name: "links", type: "{ label, href }[]", description: "Ссылки справа" },
    ],
    figma: "12531:2618",
  },
];

export const foundations: NavItem[] = [
  { slug: "colors", title: "Цвета" },
  { slug: "typography", title: "Типографика" },
  { slug: "spacing", title: "Отступы и радиусы" },
  { slug: "effects", title: "Тени" },
  { slug: "icons", title: "Иконки" },
];

const pick = (...slugs: string[]) =>
  slugs.map((s) => {
    const c = components.find((x) => x.slug === s)!;
    return { slug: `components/${c.slug}`, title: c.title };
  });

export const nav: NavGroup[] = [
  {
    title: "Начало работы",
    items: [
      { slug: "", title: "Введение" },
      { slug: "installation", title: "Установка" },
    ],
  },
  { title: "Основы", items: foundations.map((f) => ({ slug: `foundations/${f.slug}`, title: f.title })) },
  { title: "Ввод", items: pick("button", "checkbox", "radio", "toggle", "input", "textarea", "search", "dropdown") },
  { title: "Отображение данных", items: pick("status", "tag", "info-field", "notification", "table", "timeline", "approval") },
  { title: "Оверлеи", items: pick("toast", "modal", "tooltip") },
  { title: "Навигация", items: pick("header", "sidebar", "tabs", "footer") },
];

export const flatNav: NavItem[] = nav.flatMap((g) => g.items);
