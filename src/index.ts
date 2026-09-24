// @omega-os/ui — React components + design tokens.
// Icon rule: lucide-react only, never emoji.

export { Alert } from './components/Alert.js';
export type { AlertProps, AlertTone } from './components/Alert.js';

export { Badge } from './components/Badge.js';
export type { BadgeProps, BadgeTone } from './components/Badge.js';

export { Breadcrumbs } from './components/Breadcrumbs.js';
export type { BreadcrumbsProps, Crumb } from './components/Breadcrumbs.js';

export { Button } from './components/Button.js';
export type { ButtonProps, ButtonSize, ButtonVariant } from './components/Button.js';

export { Card } from './components/Card.js';
export type { CardPadding, CardProps } from './components/Card.js';

export { Avatar } from './components/Avatar.js';
export type { AvatarProps, AvatarSize } from './components/Avatar.js';

export { Bar } from './components/Bar.js';
export type { BarDatum, BarProps } from './components/Bar.js';

export { Spinner } from './components/Spinner.js';
export type { SpinnerProps } from './components/Spinner.js';

export { Checkbox, Radio, Switch } from './components/Choice.js';
export type { CheckboxProps, RadioProps, SwitchProps } from './components/Choice.js';

export { Dropdown } from './components/Dropdown.js';
export type { DropdownItemDef, DropdownProps } from './components/Dropdown.js';

export { OMEGA_ICONS, iconComponentName } from './icons.js';
export type { OmegaIconName } from './icons.js';

export { EmptyState } from './components/EmptyState.js';
export type { EmptyStateProps } from './components/EmptyState.js';

export { FileViewer } from './components/FileViewer.js';
export type { FileViewerProps } from './components/FileViewer.js';

export { GraphViewer } from './components/GraphViewer.js';
export type { GraphEdge, GraphNode, GraphViewerProps } from './components/GraphViewer.js';

export { Heatmap } from './components/Heatmap.js';
export type { HeatDatum, HeatmapProps } from './components/Heatmap.js';

export { Image } from './components/Image.js';
export type { ImageProps, ImageRadius } from './components/Image.js';

export { Input, Select, Textarea } from './components/Input.js';
export type { InputProps, SelectProps, TextareaProps } from './components/Input.js';

export { Line } from './components/Line.js';
export type { LinePoint, LineProps } from './components/Line.js';

export { Modal } from './components/Modal.js';
export type { ModalProps } from './components/Modal.js';

export { Navbar } from './components/Navbar.js';
export type { NavbarLink, NavbarProps } from './components/Navbar.js';

export { Pagination, pageSlots } from './components/Pagination.js';
export type { PaginationProps } from './components/Pagination.js';

export { Pie } from './components/Pie.js';
export type { PieDatum, PieProps } from './components/Pie.js';

export { Scatter, formatTick } from './components/Scatter.js';
export type { ScatterPoint, ScatterProps, ScatterSeries } from './components/Scatter.js';

export { SearchBar } from './components/SearchBar.js';
export type { SearchBarProps } from './components/SearchBar.js';

export { Sidebar } from './components/Sidebar.js';
export type { SidebarChild, SidebarItemDef, SidebarProps } from './components/Sidebar.js';

export { Skeleton } from './components/Skeleton.js';
export type { SkeletonProps } from './components/Skeleton.js';

export { SubmenuBar } from './components/SubmenuBar.js';
export type { SubmenuBarProps, SubmenuLink } from './components/SubmenuBar.js';

export { Table } from './components/Table.js';
export type { TableAlign, TableColumn, TableProps } from './components/Table.js';

export { Tabs } from './components/Tabs.js';
export type { TabDef, TabsProps } from './components/Tabs.js';

export { Treemap, squarifyLayout } from './components/Treemap.js';
export type { TreemapDatum, TreemapProps } from './components/Treemap.js';

export { WordCloud, wordFontSize, wordTilt } from './components/WordCloud.js';
export type { WordCloudProps, WordDatum } from './components/WordCloud.js';

export { ToasterProvider, useToast } from './components/Toast.js';
export type { ToastApi, ToastKind, ToastOptions } from './components/Toast.js';

export { REVEAL_DURATION_FALLBACK, REVEAL_EASING_FALLBACK, readRevealTokens, toggleThemeReveal } from './theme.js';
export type { RevealTokens } from './theme.js';

export { Tooltip } from './components/Tooltip.js';
export type { TooltipPosition, TooltipProps } from './components/Tooltip.js';
