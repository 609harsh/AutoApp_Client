import { useEffect, useState, memo } from 'react';
// import { shallow } from 'zustand/shallow';
// import { useEditorStore } from '@/_stores/editorStore';

export const BoxDragPreview: React.FC<{ item: any, canvasWidth: number, canvasHeight: number }> = memo(function BoxDragPreview({ item, canvasWidth, canvasHeight }) {
  const [tickTock, setTickTock] = useState(false);
  useEffect(
    function subscribeToIntervalTick() {
      const interval = setInterval(() => setTickTock(!tickTock), 500);
      return () => clearInterval(interval);
    },
    [tickTock]
  );

  let { width, height } = item.defaultSize;

  return (
    <div
      className="resizer-active draggable-box"
      style={{ height: (height * canvasHeight) / 43, width: (width * canvasWidth) / 43, border: 'solid 1px rgb(70, 165, 253)', padding: '2px' }}
    >
      <div
        style={{
          background: '#438fd7',
          opacity: '0.7',
          height: '100%',
          width: '100%',
        }}
      ></div>
    </div>
  );
});
