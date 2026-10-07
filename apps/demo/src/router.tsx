import { useEffect } from 'react';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Button } from '@omega-os/ui';
import { Home } from 'lucide-react';
import { DocsLayout } from './layout.js';
import { Home as HomePage } from './pages/Home.js';
import { ComponentsIndex } from './pages/ComponentsIndex.js';
import { Showcase } from './pages/Showcase.js';
import { TypographyPage } from './pages/foundations/TypographyPage.js';
import { ColorsPage } from './pages/foundations/ColorsPage.js';
import { RadiusPage } from './pages/foundations/RadiusPage.js';
import { IconsPage } from './pages/foundations/IconsPage.js';
import { AccordionPage } from './pages/components/AccordionPage.js';
import { AlertPage } from './pages/components/AlertPage.js';
import { AvatarPage } from './pages/components/AvatarPage.js';
import { AvatarGroupPage } from './pages/components/AvatarGroupPage.js';
import { BadgePage } from './pages/components/BadgePage.js';
import { ButtonPage } from './pages/components/ButtonPage.js';
import { CardPage } from './pages/components/CardPage.js';
import { CheckboxPage } from './pages/components/CheckboxPage.js';
import { RadioPage } from './pages/components/RadioPage.js';
import { SwitchPage } from './pages/components/SwitchPage.js';
import { CarouselPage } from './pages/components/CarouselPage.js';
import { BarPage } from './pages/components/charts/BarPage.js';
import { LinePage } from './pages/components/charts/LinePage.js';
import { PiePage } from './pages/components/charts/PiePage.js';
import { ScatterPage } from './pages/components/charts/ScatterPage.js';
import { TreemapPage } from './pages/components/charts/TreemapPage.js';
import { WordCloudPage } from './pages/components/charts/WordCloudPage.js';
import { CodeBlockPage } from './pages/components/CodeBlockPage.js';
import { ComboboxPage } from './pages/components/ComboboxPage.js';
import { CommandPalettePage } from './pages/components/CommandPalettePage.js';
import { CopyButtonPage } from './pages/components/CopyButtonPage.js';
import { DatePickerPage } from './pages/components/DatePickerPage.js';
import { DrawerPage } from './pages/components/DrawerPage.js';
import { DropdownPage } from './pages/components/DropdownPage.js';
import { EmptyStatePage } from './pages/components/EmptyStatePage.js';
import { FileUploadPage } from './pages/components/FileUploadPage.js';
import { FileViewerPage } from './pages/components/FileViewerPage.js';
import { GraphViewerPage } from './pages/components/GraphViewerPage.js';
import { HeatmapPage } from './pages/components/HeatmapPage.js';
import { ImagePage } from './pages/components/ImagePage.js';
import { InputPage } from './pages/components/InputPage.js';
import { SelectPage } from './pages/components/SelectPage.js';
import { TextareaPage } from './pages/components/TextareaPage.js';
import { KbdPage } from './pages/components/KbdPage.js';
import { LogViewerPage } from './pages/components/LogViewerPage.js';
import { MarkdownPage } from './pages/components/MarkdownPage.js';
import { ModalPage } from './pages/components/ModalPage.js';
import { NavbarPage } from './pages/components/NavbarPage.js';
import { PaginationPage } from './pages/components/PaginationPage.js';
import { ProgressPage } from './pages/components/ProgressPage.js';
import { SearchBarPage } from './pages/components/SearchBarPage.js';
import { SidebarPage } from './pages/components/SidebarPage.js';
import { BreadcrumbsPage } from './pages/components/BreadcrumbsPage.js';
import { SkeletonPage } from './pages/components/SkeletonPage.js';
import { SliderPage } from './pages/components/SliderPage.js';
import { SpinnerPage } from './pages/components/SpinnerPage.js';
import { StepperPage } from './pages/components/StepperPage.js';
import { SubmenuBarPage } from './pages/components/SubmenuBarPage.js';
import { TablePage } from './pages/components/TablePage.js';
import { TabsPage } from './pages/components/TabsPage.js';
import { TimelinePage } from './pages/components/TimelinePage.js';
import { TimingBarPage } from './pages/components/TimingBarPage.js';
import { ToastPage } from './pages/components/ToastPage.js';
import { TooltipPage } from './pages/components/TooltipPage.js';
import { TreeViewPage } from './pages/components/TreeViewPage.js';

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
