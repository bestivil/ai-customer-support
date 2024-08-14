import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function Box_Shadcn() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] m-4 min-w-[90%] rounded-lg border"
    >
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full flex-col  overflow-y-scroll flex-grow space-y-14 items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
