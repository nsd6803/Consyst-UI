import * as React from "react";
import "./icons.css";

/**
 * Consyst UI — иконки Font Awesome 7 Pro (Solid), шрифтовые.
 * Шрифт подключается в consyst.css (@font-face "Font Awesome 7 Pro").
 * Цвет наследуется от текста (currentColor), размер — проп size
 * (по умолчанию 16px, внутри контролов размер задаёт сам контрол).
 *
 * Нужна иконка, которой нет в списке? <Icon glyph={"\u{f015}"} /> —
 * код глифа указан на странице иконки на fontawesome.com (поле Unicode).
 */
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  size?: number;
  color?: string;
  /** Вращение (для индикаторов загрузки) */
  spin?: boolean;
  /** Текст для скринридера. Без него иконка декоративная (aria-hidden) */
  label?: string;
}

export interface GlyphIconProps extends IconProps {
  /** Символ из шрифта Font Awesome, например "\u{f015}" */
  glyph: string;
}

export function Icon({ glyph, size, color, spin, label, className, style, ...props }: GlyphIconProps) {
  return (
    <i
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      className={["cs-icon", spin && "cs-icon--spin", className].filter(Boolean).join(" ")}
      style={{ ...(size !== undefined && { fontSize: size }), color, ...style }}
      {...props}
    >
      {glyph}
    </i>
  );
}

function createIcon(name: string, glyph: string) {
  const Component = (props: IconProps) => <Icon glyph={glyph} {...props} />;
  Component.displayName = name;
  return Component;
}

export const IconCheck = createIcon("IconCheck", "\u{f00c}"); // check
export const IconMinus = createIcon("IconMinus", "\u{f068}"); // minus
export const IconX = createIcon("IconX", "\u{f00d}"); // xmark
export const IconPlus = createIcon("IconPlus", "\u{002b}"); // plus
export const IconSearch = createIcon("IconSearch", "\u{f002}"); // magnifying-glass
export const IconChevronDown = createIcon("IconChevronDown", "\u{f078}"); // chevron-down
export const IconChevronUp = createIcon("IconChevronUp", "\u{f077}"); // chevron-up
export const IconChevronLeft = createIcon("IconChevronLeft", "\u{f053}"); // chevron-left
export const IconChevronRight = createIcon("IconChevronRight", "\u{f054}"); // chevron-right
export const IconArrowLeft = createIcon("IconArrowLeft", "\u{f060}"); // arrow-left
export const IconArrowRight = createIcon("IconArrowRight", "\u{f061}"); // arrow-right
export const IconCaretDown = createIcon("IconCaretDown", "\u{f0d7}"); // caret-down
export const IconCircleCheck = createIcon("IconCircleCheck", "\u{f058}"); // circle-check
export const IconCircleX = createIcon("IconCircleX", "\u{f057}"); // circle-xmark
export const IconInfo = createIcon("IconInfo", "\u{f05a}"); // circle-info
export const IconWarning = createIcon("IconWarning", "\u{f071}"); // triangle-exclamation
export const IconQuestion = createIcon("IconQuestion", "\u{f059}"); // circle-question
export const IconRotate = createIcon("IconRotate", "\u{f2f9}"); // rotate-right
export const IconPen = createIcon("IconPen", "\u{f304}"); // pen
export const IconTrash = createIcon("IconTrash", "\u{f1f8}"); // trash
export const IconCopy = createIcon("IconCopy", "\u{f0c5}"); // copy
export const IconDownload = createIcon("IconDownload", "\u{f56d}"); // file-arrow-down
export const IconUpload = createIcon("IconUpload", "\u{f093}"); // upload
export const IconPaperclip = createIcon("IconPaperclip", "\u{f0c6}"); // paperclip
export const IconFilter = createIcon("IconFilter", "\u{f0b0}"); // filter
export const IconSort = createIcon("IconSort", "\u{f0dc}"); // sort
export const IconSortUp = createIcon("IconSortUp", "\u{f0de}"); // sort-up
export const IconSortDown = createIcon("IconSortDown", "\u{f0dd}"); // sort-down
export const IconDots = createIcon("IconDots", "\u{f142}"); // ellipsis-vertical
export const IconDotsHorizontal = createIcon("IconDotsHorizontal", "\u{f141}"); // ellipsis
export const IconBars = createIcon("IconBars", "\u{f0c9}"); // bars
export const IconExternal = createIcon("IconExternal", "\u{f08e}"); // arrow-up-right-from-square
export const IconBell = createIcon("IconBell", "\u{f0f3}"); // bell
export const IconHome = createIcon("IconHome", "\u{f015}"); // house
export const IconUser = createIcon("IconUser", "\u{f007}"); // user
export const IconUserTie = createIcon("IconUserTie", "\u{e45f}"); // user-tie-hair
export const IconUserPlus = createIcon("IconUserPlus", "\u{f234}"); // user-plus
export const IconUsers = createIcon("IconUsers", "\u{f0c0}"); // users
export const IconGraduation = createIcon("IconGraduation", "\u{f19d}"); // graduation-cap
export const IconFile = createIcon("IconFile", "\u{f15b}"); // file
export const IconFileLines = createIcon("IconFileLines", "\u{f15c}"); // file-lines
export const IconFileXls = createIcon("IconFileXls", "\u{e64d}"); // file-xls
export const IconBook = createIcon("IconBook", "\u{f02d}"); // book
export const IconBriefcase = createIcon("IconBriefcase", "\u{f0b1}"); // briefcase
export const IconCalendar = createIcon("IconCalendar", "\u{f133}"); // calendar
export const IconClock = createIcon("IconClock", "\u{f017}"); // clock
export const IconSupport = createIcon("IconSupport", "\u{e1e7}"); // messages-question
export const IconGear = createIcon("IconGear", "\u{f013}"); // gear
export const IconLock = createIcon("IconLock", "\u{f023}"); // lock
export const IconEye = createIcon("IconEye", "\u{f06e}"); // eye
export const IconEyeSlash = createIcon("IconEyeSlash", "\u{f070}"); // eye-slash
export const IconInbox = createIcon("IconInbox", "\u{f01c}"); // inbox
export const IconStar = createIcon("IconStar", "\u{f005}"); // star
export const IconLink = createIcon("IconLink", "\u{f0c1}"); // link
export const IconSun = createIcon("IconSun", "\u{f185}"); // sun
export const IconMoon = createIcon("IconMoon", "\u{f186}"); // moon
export const IconSpinner = createIcon("IconSpinner", "\u{f1ce}"); // circle-notch
export const IconSparkle = createIcon("IconSparkle", "\u{f86d}"); // icons
export const IconRocket = createIcon("IconRocket", "\u{e027}"); // rocket-launch

/* Стрелки и навигация */
export const IconArrowUp = createIcon("IconArrowUp", "\u{f062}"); // arrow-up
export const IconArrowDown = createIcon("IconArrowDown", "\u{f063}"); // arrow-down
export const IconArrowRotateLeft = createIcon("IconArrowRotateLeft", "\u{f0e2}"); // arrow-rotate-left
export const IconArrowRotateRight = createIcon("IconArrowRotateRight", "\u{f01e}"); // arrow-rotate-right
export const IconArrowsRotate = createIcon("IconArrowsRotate", "\u{f021}"); // arrows-rotate
export const IconArrowRightFromBracket = createIcon("IconArrowRightFromBracket", "\u{f08b}"); // arrow-right-from-bracket
export const IconArrowRightToBracket = createIcon("IconArrowRightToBracket", "\u{f090}"); // arrow-right-to-bracket
export const IconArrowUpFromBracket = createIcon("IconArrowUpFromBracket", "\u{e09a}"); // arrow-up-from-bracket
export const IconArrowDownWideShort = createIcon("IconArrowDownWideShort", "\u{f160}"); // arrow-down-wide-short
export const IconArrowUpWideShort = createIcon("IconArrowUpWideShort", "\u{f161}"); // arrow-up-wide-short
export const IconArrowTrendUp = createIcon("IconArrowTrendUp", "\u{e098}"); // arrow-trend-up
export const IconArrowTrendDown = createIcon("IconArrowTrendDown", "\u{e097}"); // arrow-trend-down
export const IconArrowsUpDownLeftRight = createIcon("IconArrowsUpDownLeftRight", "\u{f047}"); // arrows-up-down-left-right
export const IconAngleUp = createIcon("IconAngleUp", "\u{f106}"); // angle-up
export const IconAngleDown = createIcon("IconAngleDown", "\u{f107}"); // angle-down
export const IconAngleLeft = createIcon("IconAngleLeft", "\u{f104}"); // angle-left
export const IconAngleRight = createIcon("IconAngleRight", "\u{f105}"); // angle-right
export const IconAnglesLeft = createIcon("IconAnglesLeft", "\u{f100}"); // angles-left
export const IconAnglesRight = createIcon("IconAnglesRight", "\u{f101}"); // angles-right
export const IconCaretUp = createIcon("IconCaretUp", "\u{f0d8}"); // caret-up
export const IconCaretLeft = createIcon("IconCaretLeft", "\u{f0d9}"); // caret-left
export const IconCaretRight = createIcon("IconCaretRight", "\u{f0da}"); // caret-right
export const IconExpand = createIcon("IconExpand", "\u{f065}"); // expand
export const IconCompress = createIcon("IconCompress", "\u{f066}"); // compress
export const IconMaximize = createIcon("IconMaximize", "\u{f31e}"); // maximize
export const IconMinimize = createIcon("IconMinimize", "\u{f78c}"); // minimize
export const IconShare = createIcon("IconShare", "\u{f064}"); // share
export const IconReply = createIcon("IconReply", "\u{f3e5}"); // reply
export const IconGrip = createIcon("IconGrip", "\u{f58d}"); // grip
export const IconGripVertical = createIcon("IconGripVertical", "\u{f58e}"); // grip-vertical
export const IconGripLines = createIcon("IconGripLines", "\u{f7a4}"); // grip-lines
export const IconBarsStaggered = createIcon("IconBarsStaggered", "\u{f550}"); // bars-staggered

/* Статусы и обратная связь */
export const IconCircleExclamation = createIcon("IconCircleExclamation", "\u{f06a}"); // circle-exclamation
export const IconCirclePlus = createIcon("IconCirclePlus", "\u{f055}"); // circle-plus
export const IconCircleMinus = createIcon("IconCircleMinus", "\u{f056}"); // circle-minus
export const IconSquareCheck = createIcon("IconSquareCheck", "\u{f14a}"); // square-check
export const IconSquare = createIcon("IconSquare", "\u{f0c8}"); // square
export const IconCircle = createIcon("IconCircle", "\u{f111}"); // circle
export const IconCircleDot = createIcon("IconCircleDot", "\u{f192}"); // circle-dot
export const IconBan = createIcon("IconBan", "\u{f05e}"); // ban
export const IconFlag = createIcon("IconFlag", "\u{f024}"); // flag
export const IconFlagCheckered = createIcon("IconFlagCheckered", "\u{f11e}"); // flag-checkered
export const IconBolt = createIcon("IconBolt", "\u{f0e7}"); // bolt
export const IconFire = createIcon("IconFire", "\u{f06d}"); // fire
export const IconThumbsUp = createIcon("IconThumbsUp", "\u{f164}"); // thumbs-up
export const IconThumbsDown = createIcon("IconThumbsDown", "\u{f165}"); // thumbs-down
export const IconHeart = createIcon("IconHeart", "\u{f004}"); // heart
export const IconBookmark = createIcon("IconBookmark", "\u{f02e}"); // bookmark
export const IconStarHalfStroke = createIcon("IconStarHalfStroke", "\u{f5c0}"); // star-half-stroke
export const IconAward = createIcon("IconAward", "\u{f559}"); // award
export const IconMedal = createIcon("IconMedal", "\u{f5a2}"); // medal
export const IconTrophy = createIcon("IconTrophy", "\u{f091}"); // trophy
export const IconCertificate = createIcon("IconCertificate", "\u{f0a3}"); // certificate
export const IconBullseye = createIcon("IconBullseye", "\u{f140}"); // bullseye
export const IconLightbulb = createIcon("IconLightbulb", "\u{f0eb}"); // lightbulb
export const IconCircleHalfStroke = createIcon("IconCircleHalfStroke", "\u{f042}"); // circle-half-stroke
export const IconToggleOn = createIcon("IconToggleOn", "\u{f205}"); // toggle-on
export const IconToggleOff = createIcon("IconToggleOff", "\u{f204}"); // toggle-off

/* Пользователи */
export const IconUserMinus = createIcon("IconUserMinus", "\u{f503}"); // user-minus
export const IconUserCheck = createIcon("IconUserCheck", "\u{f4fc}"); // user-check
export const IconUserXmark = createIcon("IconUserXmark", "\u{f235}"); // user-xmark
export const IconUserGroup = createIcon("IconUserGroup", "\u{f500}"); // user-group
export const IconUserGear = createIcon("IconUserGear", "\u{f4fe}"); // user-gear
export const IconUserGraduate = createIcon("IconUserGraduate", "\u{f501}"); // user-graduate
export const IconUserShield = createIcon("IconUserShield", "\u{f505}"); // user-shield
export const IconUserLock = createIcon("IconUserLock", "\u{f502}"); // user-lock
export const IconUserPen = createIcon("IconUserPen", "\u{f4ff}"); // user-pen
export const IconCircleUser = createIcon("IconCircleUser", "\u{f2bd}"); // circle-user
export const IconIdCard = createIcon("IconIdCard", "\u{f2c2}"); // id-card
export const IconIdBadge = createIcon("IconIdBadge", "\u{f2c1}"); // id-badge
export const IconAddressBook = createIcon("IconAddressBook", "\u{f2b9}"); // address-book
export const IconPeopleGroup = createIcon("IconPeopleGroup", "\u{e533}"); // people-group
export const IconChalkboardUser = createIcon("IconChalkboardUser", "\u{f51c}"); // chalkboard-user
export const IconHandshake = createIcon("IconHandshake", "\u{f2b5}"); // handshake
export const IconHeadset = createIcon("IconHeadset", "\u{f590}"); // headset

/* Общение */
export const IconEnvelope = createIcon("IconEnvelope", "\u{f0e0}"); // envelope
export const IconEnvelopeOpen = createIcon("IconEnvelopeOpen", "\u{f2b6}"); // envelope-open
export const IconPaperPlane = createIcon("IconPaperPlane", "\u{f1d8}"); // paper-plane
export const IconComment = createIcon("IconComment", "\u{f075}"); // comment
export const IconComments = createIcon("IconComments", "\u{f086}"); // comments
export const IconMessage = createIcon("IconMessage", "\u{f27a}"); // message
export const IconPhone = createIcon("IconPhone", "\u{f095}"); // phone
export const IconAt = createIcon("IconAt", "\u{f1fa}"); // at
export const IconBullhorn = createIcon("IconBullhorn", "\u{f0a1}"); // bullhorn
export const IconBellSlash = createIcon("IconBellSlash", "\u{f1f6}"); // bell-slash
export const IconVideo = createIcon("IconVideo", "\u{f03d}"); // video
export const IconMicrophone = createIcon("IconMicrophone", "\u{f130}"); // microphone
export const IconShareNodes = createIcon("IconShareNodes", "\u{f1e0}"); // share-nodes
export const IconQuoteLeft = createIcon("IconQuoteLeft", "\u{f10d}"); // quote-left

/* Файлы и документы */
export const IconFilePdf = createIcon("IconFilePdf", "\u{f1c1}"); // file-pdf
export const IconFileWord = createIcon("IconFileWord", "\u{f1c2}"); // file-word
export const IconFileExcel = createIcon("IconFileExcel", "\u{f1c3}"); // file-excel
export const IconFileImage = createIcon("IconFileImage", "\u{f1c5}"); // file-image
export const IconFileZipper = createIcon("IconFileZipper", "\u{f1c6}"); // file-zipper
export const IconFileArrowUp = createIcon("IconFileArrowUp", "\u{f574}"); // file-arrow-up
export const IconFileSignature = createIcon("IconFileSignature", "\u{f573}"); // file-signature
export const IconFileContract = createIcon("IconFileContract", "\u{f56c}"); // file-contract
export const IconFilePen = createIcon("IconFilePen", "\u{f31c}"); // file-pen
export const IconFileExport = createIcon("IconFileExport", "\u{f56e}"); // file-export
export const IconFileImport = createIcon("IconFileImport", "\u{f56f}"); // file-import
export const IconFolder = createIcon("IconFolder", "\u{f07b}"); // folder
export const IconFolderOpen = createIcon("IconFolderOpen", "\u{f07c}"); // folder-open
export const IconFolderPlus = createIcon("IconFolderPlus", "\u{f65e}"); // folder-plus
export const IconClipboard = createIcon("IconClipboard", "\u{f328}"); // clipboard
export const IconClipboardList = createIcon("IconClipboardList", "\u{f46d}"); // clipboard-list
export const IconClipboardCheck = createIcon("IconClipboardCheck", "\u{f46c}"); // clipboard-check
export const IconBoxArchive = createIcon("IconBoxArchive", "\u{f187}"); // box-archive
export const IconPrint = createIcon("IconPrint", "\u{f02f}"); // print
export const IconFloppyDisk = createIcon("IconFloppyDisk", "\u{f0c7}"); // floppy-disk
export const IconImage = createIcon("IconImage", "\u{f03e}"); // image
export const IconImages = createIcon("IconImages", "\u{f302}"); // images
export const IconCloud = createIcon("IconCloud", "\u{f0c2}"); // cloud
export const IconCloudArrowUp = createIcon("IconCloudArrowUp", "\u{f0ee}"); // cloud-arrow-up
export const IconCloudArrowDown = createIcon("IconCloudArrowDown", "\u{f0ed}"); // cloud-arrow-down
export const IconPaste = createIcon("IconPaste", "\u{f0ea}"); // paste
export const IconClone = createIcon("IconClone", "\u{f24d}"); // clone
export const IconScissors = createIcon("IconScissors", "\u{f0c4}"); // scissors
export const IconNoteSticky = createIcon("IconNoteSticky", "\u{f249}"); // note-sticky
export const IconNewspaper = createIcon("IconNewspaper", "\u{f1ea}"); // newspaper
export const IconBookOpen = createIcon("IconBookOpen", "\u{f518}"); // book-open
export const IconThumbtack = createIcon("IconThumbtack", "\u{f08d}"); // thumbtack

/* Редактирование и данные */
export const IconPenToSquare = createIcon("IconPenToSquare", "\u{f044}"); // pen-to-square
export const IconPencil = createIcon("IconPencil", "\u{f303}"); // pencil
export const IconEraser = createIcon("IconEraser", "\u{f12d}"); // eraser
export const IconTrashCan = createIcon("IconTrashCan", "\u{f2ed}"); // trash-can
export const IconList = createIcon("IconList", "\u{f03a}"); // list
export const IconListUl = createIcon("IconListUl", "\u{f0ca}"); // list-ul
export const IconListOl = createIcon("IconListOl", "\u{f0cb}"); // list-ol
export const IconListCheck = createIcon("IconListCheck", "\u{f0ae}"); // list-check
export const IconTable = createIcon("IconTable", "\u{f0ce}"); // table
export const IconTableCells = createIcon("IconTableCells", "\u{f00a}"); // table-cells
export const IconTableList = createIcon("IconTableList", "\u{f00b}"); // table-list
export const IconSliders = createIcon("IconSliders", "\u{f1de}"); // sliders
export const IconMagnifyingGlassPlus = createIcon("IconMagnifyingGlassPlus", "\u{f00e}"); // magnifying-glass-plus
export const IconMagnifyingGlassMinus = createIcon("IconMagnifyingGlassMinus", "\u{f010}"); // magnifying-glass-minus
export const IconWandMagicSparkles = createIcon("IconWandMagicSparkles", "\u{e2ca}"); // wand-magic-sparkles
export const IconBold = createIcon("IconBold", "\u{f032}"); // bold
export const IconItalic = createIcon("IconItalic", "\u{f033}"); // italic
export const IconUnderline = createIcon("IconUnderline", "\u{f0cd}"); // underline
export const IconAlignLeft = createIcon("IconAlignLeft", "\u{f036}"); // align-left
export const IconAlignCenter = createIcon("IconAlignCenter", "\u{f037}"); // align-center
export const IconAlignRight = createIcon("IconAlignRight", "\u{f038}"); // align-right
export const IconLinkSlash = createIcon("IconLinkSlash", "\u{f127}"); // link-slash
export const IconCode = createIcon("IconCode", "\u{f121}"); // code
export const IconKeyboard = createIcon("IconKeyboard", "\u{f11c}"); // keyboard
export const IconLanguage = createIcon("IconLanguage", "\u{f1ab}"); // language
export const IconFont = createIcon("IconFont", "\u{f031}"); // font
export const IconHeading = createIcon("IconHeading", "\u{f1dc}"); // heading
export const IconChartLine = createIcon("IconChartLine", "\u{f201}"); // chart-line
export const IconChartPie = createIcon("IconChartPie", "\u{f200}"); // chart-pie
export const IconChartBar = createIcon("IconChartBar", "\u{f080}"); // chart-bar
export const IconChartColumn = createIcon("IconChartColumn", "\u{e0e3}"); // chart-column
export const IconChartSimple = createIcon("IconChartSimple", "\u{e473}"); // chart-simple
export const IconDatabase = createIcon("IconDatabase", "\u{f1c0}"); // database
export const IconLayerGroup = createIcon("IconLayerGroup", "\u{f5fd}"); // layer-group
export const IconSitemap = createIcon("IconSitemap", "\u{f0e8}"); // sitemap
export const IconDiagramProject = createIcon("IconDiagramProject", "\u{f542}"); // diagram-project
export const IconCube = createIcon("IconCube", "\u{f1b2}"); // cube
export const IconCubes = createIcon("IconCubes", "\u{f1b3}"); // cubes
export const IconPuzzlePiece = createIcon("IconPuzzlePiece", "\u{f12e}"); // puzzle-piece
export const IconQrcode = createIcon("IconQrcode", "\u{f029}"); // qrcode
export const IconBarcode = createIcon("IconBarcode", "\u{f02a}"); // barcode
export const IconCrop = createIcon("IconCrop", "\u{f125}"); // crop

/* Время */
export const IconCalendarDays = createIcon("IconCalendarDays", "\u{f073}"); // calendar-days
export const IconCalendarCheck = createIcon("IconCalendarCheck", "\u{f274}"); // calendar-check
export const IconCalendarPlus = createIcon("IconCalendarPlus", "\u{f271}"); // calendar-plus
export const IconCalendarXmark = createIcon("IconCalendarXmark", "\u{f273}"); // calendar-xmark
export const IconCalendarWeek = createIcon("IconCalendarWeek", "\u{f784}"); // calendar-week
export const IconHourglass = createIcon("IconHourglass", "\u{f254}"); // hourglass
export const IconHourglassHalf = createIcon("IconHourglassHalf", "\u{f252}"); // hourglass-half
export const IconStopwatch = createIcon("IconStopwatch", "\u{f2f2}"); // stopwatch
export const IconClockRotateLeft = createIcon("IconClockRotateLeft", "\u{f1da}"); // clock-rotate-left
export const IconAlarmClock = createIcon("IconAlarmClock", "\u{f34e}"); // alarm-clock

/* Организация и работа */
export const IconBuilding = createIcon("IconBuilding", "\u{f1ad}"); // building
export const IconBuildingColumns = createIcon("IconBuildingColumns", "\u{f19c}"); // building-columns
export const IconCity = createIcon("IconCity", "\u{f64f}"); // city
export const IconSchool = createIcon("IconSchool", "\u{f549}"); // school
export const IconSuitcase = createIcon("IconSuitcase", "\u{f0f2}"); // suitcase
export const IconMoneyBill = createIcon("IconMoneyBill", "\u{f0d6}"); // money-bill
export const IconWallet = createIcon("IconWallet", "\u{f555}"); // wallet
export const IconCreditCard = createIcon("IconCreditCard", "\u{f09d}"); // credit-card
export const IconReceipt = createIcon("IconReceipt", "\u{f543}"); // receipt
export const IconRubleSign = createIcon("IconRubleSign", "\u{f158}"); // ruble-sign
export const IconPercent = createIcon("IconPercent", "\u{0025}"); // percent
export const IconCalculator = createIcon("IconCalculator", "\u{f1ec}"); // calculator
export const IconGift = createIcon("IconGift", "\u{f06b}"); // gift
export const IconCartShopping = createIcon("IconCartShopping", "\u{f07a}"); // cart-shopping
export const IconBagShopping = createIcon("IconBagShopping", "\u{f290}"); // bag-shopping
export const IconTag = createIcon("IconTag", "\u{f02b}"); // tag
export const IconTags = createIcon("IconTags", "\u{f02c}"); // tags
export const IconLocationDot = createIcon("IconLocationDot", "\u{f3c5}"); // location-dot
export const IconMap = createIcon("IconMap", "\u{f279}"); // map
export const IconMapLocationDot = createIcon("IconMapLocationDot", "\u{f5a0}"); // map-location-dot
export const IconGlobe = createIcon("IconGlobe", "\u{f0ac}"); // globe
export const IconEarthEurope = createIcon("IconEarthEurope", "\u{f7a2}"); // earth-europe
export const IconDoorOpen = createIcon("IconDoorOpen", "\u{f52b}"); // door-open
export const IconCar = createIcon("IconCar", "\u{f1b9}"); // car
export const IconPlane = createIcon("IconPlane", "\u{f072}"); // plane
export const IconTrain = createIcon("IconTrain", "\u{f238}"); // train
export const IconBus = createIcon("IconBus", "\u{f207}"); // bus
export const IconMugHot = createIcon("IconMugHot", "\u{f7b6}"); // mug-hot
export const IconUtensils = createIcon("IconUtensils", "\u{f2e7}"); // utensils
export const IconCompass = createIcon("IconCompass", "\u{f14e}"); // compass

/* Устройства и система */
export const IconLaptop = createIcon("IconLaptop", "\u{f109}"); // laptop
export const IconLaptopCode = createIcon("IconLaptopCode", "\u{f5fc}"); // laptop-code
export const IconDesktop = createIcon("IconDesktop", "\u{f390}"); // desktop
export const IconMobileScreenButton = createIcon("IconMobileScreenButton", "\u{f3cd}"); // mobile-screen-button
export const IconTabletScreenButton = createIcon("IconTabletScreenButton", "\u{f3fa}"); // tablet-screen-button
export const IconServer = createIcon("IconServer", "\u{f233}"); // server
export const IconWifi = createIcon("IconWifi", "\u{f1eb}"); // wifi
export const IconKey = createIcon("IconKey", "\u{f084}"); // key
export const IconUnlock = createIcon("IconUnlock", "\u{f09c}"); // unlock
export const IconLockOpen = createIcon("IconLockOpen", "\u{f3c1}"); // lock-open
export const IconFingerprint = createIcon("IconFingerprint", "\u{f577}"); // fingerprint
export const IconShield = createIcon("IconShield", "\u{f132}"); // shield
export const IconShieldHalved = createIcon("IconShieldHalved", "\u{f3ed}"); // shield-halved
export const IconGears = createIcon("IconGears", "\u{f085}"); // gears
export const IconWrench = createIcon("IconWrench", "\u{f0ad}"); // wrench
export const IconScrewdriverWrench = createIcon("IconScrewdriverWrench", "\u{f7d9}"); // screwdriver-wrench
export const IconToolbox = createIcon("IconToolbox", "\u{f552}"); // toolbox
export const IconHammer = createIcon("IconHammer", "\u{f6e3}"); // hammer
export const IconPowerOff = createIcon("IconPowerOff", "\u{f011}"); // power-off
export const IconRobot = createIcon("IconRobot", "\u{f544}"); // robot
export const IconLifeRing = createIcon("IconLifeRing", "\u{f1cd}"); // life-ring
export const IconUniversalAccess = createIcon("IconUniversalAccess", "\u{f29a}"); // universal-access
export const IconEyeLowVision = createIcon("IconEyeLowVision", "\u{f2a8}"); // eye-low-vision
export const IconHand = createIcon("IconHand", "\u{f256}"); // hand
export const IconHandPointer = createIcon("IconHandPointer", "\u{f25a}"); // hand-pointer
export const IconPalette = createIcon("IconPalette", "\u{f53f}"); // palette
export const IconPaintbrush = createIcon("IconPaintbrush", "\u{f1fc}"); // paintbrush
export const IconDroplet = createIcon("IconDroplet", "\u{f043}"); // droplet
export const IconCamera = createIcon("IconCamera", "\u{f030}"); // camera
export const IconPlay = createIcon("IconPlay", "\u{f04b}"); // play
export const IconPause = createIcon("IconPause", "\u{f04c}"); // pause
export const IconStop = createIcon("IconStop", "\u{f04d}"); // stop
export const IconCirclePlay = createIcon("IconCirclePlay", "\u{f144}"); // circle-play
export const IconForward = createIcon("IconForward", "\u{f04e}"); // forward
export const IconBackward = createIcon("IconBackward", "\u{f04a}"); // backward
export const IconVolumeHigh = createIcon("IconVolumeHigh", "\u{f028}"); // volume-high
export const IconVolumeXmark = createIcon("IconVolumeXmark", "\u{f6a9}"); // volume-xmark

/* Природа и разное */
export const IconLeaf = createIcon("IconLeaf", "\u{f06c}"); // leaf
export const IconSeedling = createIcon("IconSeedling", "\u{f4d8}"); // seedling
export const IconTree = createIcon("IconTree", "\u{f1bb}"); // tree
export const IconCloudSun = createIcon("IconCloudSun", "\u{f6c4}"); // cloud-sun
export const IconSnowflake = createIcon("IconSnowflake", "\u{f2dc}"); // snowflake
export const IconUmbrella = createIcon("IconUmbrella", "\u{f0e9}"); // umbrella
