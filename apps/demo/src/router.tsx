import { lazy, useEffect } from 'react';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Button } from '@omega-os/ui';
import { Home } from 'lucide-react';
import { DocsLayout } from './layout.js';
import { Home as HomePage } from './pages/Home.js';
import { ComponentsIndex } from './pages/ComponentsIndex.js';

const Showcase = lazy(() => import('./pages/Showcase.js').then((m) => ({ default: m.Showcase })));

const TypographyPage = lazy(() => import('./pages/foundations/TypographyPage.js').then((m) => ({ default: m.TypographyPage })));
const ColorsPage = lazy(() => import('./pages/foundations/ColorsPage.js').then((m) => ({ default: m.ColorsPage })));
const RadiusPage = lazy(() => import('./pages/foundations/RadiusPage.js').then((m) => ({ default: m.RadiusPage })));
const IconsPage = lazy(() => import('./pages/foundations/IconsPage.js').then((m) => ({ default: m.IconsPage })));
const AccordionPage = lazy(() => import('./pages/components/AccordionPage.js').then((m) => ({ default: m.AccordionPage })));
const AlertPage = lazy(() => import('./pages/components/AlertPage.js').then((m) => ({ default: m.AlertPage })));
const AvatarPage = lazy(() => import('./pages/components/AvatarPage.js').then((m) => ({ default: m.AvatarPage })));
const AvatarGroupPage = lazy(() => import('./pages/components/AvatarGroupPage.js').then((m) => ({ default: m.AvatarGroupPage })));
const BadgePage = lazy(() => import('./pages/components/BadgePage.js').then((m) => ({ default: m.BadgePage })));
const ButtonPage = lazy(() => import('./pages/components/ButtonPage.js').then((m) => ({ default: m.ButtonPage })));
const CardPage = lazy(() => import('./pages/components/CardPage.js').then((m) => ({ default: m.CardPage })));
const CheckboxPage = lazy(() => import('./pages/components/CheckboxPage.js').then((m) => ({ default: m.CheckboxPage })));
const RadioPage = lazy(() => import('./pages/components/RadioPage.js').then((m) => ({ default: m.RadioPage })));
const SwitchPage = lazy(() => import('./pages/components/SwitchPage.js').then((m) => ({ default: m.SwitchPage })));
const CarouselPage = lazy(() => import('./pages/components/CarouselPage.js').then((m) => ({ default: m.CarouselPage })));
const BarPage = lazy(() => import('./pages/components/charts/BarPage.js').then((m) => ({ default: m.BarPage })));
const LinePage = lazy(() => import('./pages/components/charts/LinePage.js').then((m) => ({ default: m.LinePage })));
const PiePage = lazy(() => import('./pages/components/charts/PiePage.js').then((m) => ({ default: m.PiePage })));
const ScatterPage = lazy(() => import('./pages/components/charts/ScatterPage.js').then((m) => ({ default: m.ScatterPage })));
const TreemapPage = lazy(() => import('./pages/components/charts/TreemapPage.js').then((m) => ({ default: m.TreemapPage })));
const WordCloudPage = lazy(() => import('./pages/components/charts/WordCloudPage.js').then((m) => ({ default: m.WordCloudPage })));
const CodeBlockPage = lazy(() => import('./pages/components/CodeBlockPage.js').then((m) => ({ default: m.CodeBlockPage })));
const ComboboxPage = lazy(() => import('./pages/components/ComboboxPage.js').then((m) => ({ default: m.ComboboxPage })));
const CommandPalettePage = lazy(() => import('./pages/components/CommandPalettePage.js').then((m) => ({ default: m.CommandPalettePage })));
const CopyButtonPage = lazy(() => import('./pages/components/CopyButtonPage.js').then((m) => ({ default: m.CopyButtonPage })));
const DatePickerPage = lazy(() => import('./pages/components/DatePickerPage.js').then((m) => ({ default: m.DatePickerPage })));
const DrawerPage = lazy(() => import('./pages/components/DrawerPage.js').then((m) => ({ default: m.DrawerPage })));
const DropdownPage = lazy(() => import('./pages/components/DropdownPage.js').then((m) => ({ default: m.DropdownPage })));
const EmptyStatePage = lazy(() => import('./pages/components/EmptyStatePage.js').then((m) => ({ default: m.EmptyStatePage })));
const FileUploadPage = lazy(() => import('./pages/components/FileUploadPage.js').then((m) => ({ default: m.FileUploadPage })));
const FileViewerPage = lazy(() => import('./pages/components/FileViewerPage.js').then((m) => ({ default: m.FileViewerPage })));
const GraphViewerPage = lazy(() => import('./pages/components/GraphViewerPage.js').then((m) => ({ default: m.GraphViewerPage })));
const HeatmapPage = lazy(() => import('./pages/components/HeatmapPage.js').then((m) => ({ default: m.HeatmapPage })));
const ImagePage = lazy(() => import('./pages/components/ImagePage.js').then((m) => ({ default: m.ImagePage })));
const InputPage = lazy(() => import('./pages/components/InputPage.js').then((m) => ({ default: m.InputPage })));
const SelectPage = lazy(() => import('./pages/components/SelectPage.js').then((m) => ({ default: m.SelectPage })));
const TextareaPage = lazy(() => import('./pages/components/TextareaPage.js').then((m) => ({ default: m.TextareaPage })));
const KbdPage = lazy(() => import('./pages/components/KbdPage.js').then((m) => ({ default: m.KbdPage })));
const LogViewerPage = lazy(() => import('./pages/components/LogViewerPage.js').then((m) => ({ default: m.LogViewerPage })));
const MarkdownPage = lazy(() => import('./pages/components/MarkdownPage.js').then((m) => ({ default: m.MarkdownPage })));
const ModalPage = lazy(() => import('./pages/components/ModalPage.js').then((m) => ({ default: m.ModalPage })));
const NavbarPage = lazy(() => import('./pages/components/NavbarPage.js').then((m) => ({ default: m.NavbarPage })));
const PaginationPage = lazy(() => import('./pages/components/PaginationPage.js').then((m) => ({ default: m.PaginationPage })));
const ProgressPage = lazy(() => import('./pages/components/ProgressPage.js').then((m) => ({ default: m.ProgressPage })));
const SearchBarPage = lazy(() => import('./pages/components/SearchBarPage.js').then((m) => ({ default: m.SearchBarPage })));
const SidebarPage = lazy(() => import('./pages/components/SidebarPage.js').then((m) => ({ default: m.SidebarPage })));
const BreadcrumbsPage = lazy(() => import('./pages/components/BreadcrumbsPage.js').then((m) => ({ default: m.BreadcrumbsPage })));
const SkeletonPage = lazy(() => import('./pages/components/SkeletonPage.js').then((m) => ({ default: m.SkeletonPage })));
const SliderPage = lazy(() => import('./pages/components/SliderPage.js').then((m) => ({ default: m.SliderPage })));
const SpinnerPage = lazy(() => import('./pages/components/SpinnerPage.js').then((m) => ({ default: m.SpinnerPage })));
const StepperPage = lazy(() => import('./pages/components/StepperPage.js').then((m) => ({ default: m.StepperPage })));
const SubmenuBarPage = lazy(() => import('./pages/components/SubmenuBarPage.js').then((m) => ({ default: m.SubmenuBarPage })));
const TablePage = lazy(() => import('./pages/components/TablePage.js').then((m) => ({ default: m.TablePage })));
const TabsPage = lazy(() => import('./pages/components/TabsPage.js').then((m) => ({ default: m.TabsPage })));
const TimelinePage = lazy(() => import('./pages/components/TimelinePage.js').then((m) => ({ default: m.TimelinePage })));
const TimingBarPage = lazy(() => import('./pages/components/TimingBarPage.js').then((m) => ({ default: m.TimingBarPage })));
const ToastPage = lazy(() => import('./pages/components/ToastPage.js').then((m) => ({ default: m.ToastPage })));
const TooltipPage = lazy(() => import('./pages/components/TooltipPage.js').then((m) => ({ default: m.TooltipPage })));
const TreeViewPage = lazy(() => import('./pages/components/TreeViewPage.js').then((m) => ({ default: m.TreeViewPage })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="mx-auto grid w-full max-w-2xl place-items-center gap-3 rounded-ot-lg border border-ot-border bg-ot-surface p-10 text-center">
      <p className="text-4xl font-extrabold tracking-tight">404</p>
      <p className="text-sm text-ot-muted">This docs page does not exist. Pick one from the sidebar.</p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <Link to="/">
          <Button variant="secondary" icon={<Home size={16} />}>
            Home
          </Button>
        </Link>
        <Link to="/components">
          <Button>Components</Button>
        </Link>
      </div>
    </div>
  );
}

export function DemoRouter() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<DocsLayout />}>
          <Route index element={<HomePage />} />
          <Route path="components" element={<ComponentsIndex />} />
          <Route path="foundations/typography" element={<TypographyPage />} />
          <Route path="foundations/colors" element={<ColorsPage />} />
          <Route path="foundations/radius" element={<RadiusPage />} />
          <Route path="foundations/icons" element={<IconsPage />} />
          <Route path="components/accordion" element={<AccordionPage />} />
          <Route path="components/alert" element={<AlertPage />} />
          <Route path="components/avatar" element={<AvatarPage />} />
          <Route path="components/avatar-group" element={<AvatarGroupPage />} />
          <Route path="components/badge" element={<BadgePage />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/radio" element={<RadioPage />} />
          <Route path="components/switch" element={<SwitchPage />} />
          <Route path="components/carousel" element={<CarouselPage />} />
          <Route path="components/charts/bar" element={<BarPage />} />
          <Route path="components/charts/line" element={<LinePage />} />
          <Route path="components/charts/pie" element={<PiePage />} />
          <Route path="components/charts/scatter" element={<ScatterPage />} />
          <Route path="components/charts/treemap" element={<TreemapPage />} />
          <Route path="components/charts/wordcloud" element={<WordCloudPage />} />
          <Route path="components/code-block" element={<CodeBlockPage />} />
          <Route path="components/combobox" element={<ComboboxPage />} />
          <Route path="components/command-palette" element={<CommandPalettePage />} />
          <Route path="components/copy-button" element={<CopyButtonPage />} />
          <Route path="components/date-picker" element={<DatePickerPage />} />
          <Route path="components/drawer" element={<DrawerPage />} />
          <Route path="components/dropdown" element={<DropdownPage />} />
          <Route path="components/empty-state" element={<EmptyStatePage />} />
          <Route path="components/file-upload" element={<FileUploadPage />} />
          <Route path="components/file-viewer" element={<FileViewerPage />} />
          <Route path="components/graph-viewer" element={<GraphViewerPage />} />
          <Route path="components/heatmap" element={<HeatmapPage />} />
          <Route path="components/image" element={<ImagePage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/textarea" element={<TextareaPage />} />
          <Route path="components/kbd" element={<KbdPage />} />
          <Route path="components/log-viewer" element={<LogViewerPage />} />
          <Route path="components/markdown" element={<MarkdownPage />} />
          <Route path="components/modal" element={<ModalPage />} />
          <Route path="components/navbar" element={<NavbarPage />} />
          <Route path="components/pagination" element={<PaginationPage />} />
          <Route path="components/progress" element={<ProgressPage />} />
          <Route path="components/search-bar" element={<SearchBarPage />} />
          <Route path="components/sidebar" element={<SidebarPage />} />
          <Route path="components/breadcrumbs" element={<BreadcrumbsPage />} />
          <Route path="components/skeleton" element={<SkeletonPage />} />
          <Route path="components/slider" element={<SliderPage />} />
          <Route path="components/spinner" element={<SpinnerPage />} />
          <Route path="components/stepper" element={<StepperPage />} />
          <Route path="components/submenu-bar" element={<SubmenuBarPage />} />
          <Route path="components/table" element={<TablePage />} />
          <Route path="components/tabs" element={<TabsPage />} />
          <Route path="components/timeline" element={<TimelinePage />} />
          <Route path="components/timing-bar" element={<TimingBarPage />} />
          <Route path="components/toast" element={<ToastPage />} />
          <Route path="components/tooltip" element={<TooltipPage />} />
          <Route path="components/tree-view" element={<TreeViewPage />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
