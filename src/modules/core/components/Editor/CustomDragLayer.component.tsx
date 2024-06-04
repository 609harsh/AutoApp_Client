import { useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import { BoxDragPreview } from './BoxDragPreview.component';

const getItemStyles = (delta, item, initialOffset, currentOffset, initialClientOffset, canvasWidth, canvasHeight) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let x, y;
  let gridWidth = canvasWidth / 43;
  let gridHeight = canvasHeight / 43;

  let id = item.id;
  const realCanvasBoundingRect = document.getElementsByClassName('real-canvas')[0].getBoundingClientRect();
  if (id) {
    x = Math.round((item.left * canvasWidth) / 100 + delta.x);
    y = Math.round(item.top + delta.y);
  } else {
    const offsetFromTopOfWindow = realCanvasBoundingRect.top;
    const offsetFromLeftOfWindow = realCanvasBoundingRect.left;
    x = Math.round((currentOffset.x - offsetFromLeftOfWindow) / gridWidth) * gridWidth;
    y = Math.round((currentOffset.y - offsetFromTopOfWindow) / gridHeight) * gridHeight;
  }
 
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    width: 'fit-content',
  };
}

export const CustomDragLayer: React.FC<{ canvasWidth: number, canvasHeight: number, onDragging: (state: boolean) => void }> = ({ canvasWidth, canvasHeight, onDragging }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset, delta, initialClientOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      initialClientOffset: monitor.getInitialClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      delta: monitor.getDifferenceFromInitialOffset(),
    })
  );

  useEffect(() => {
    onDragging(isDragging);
  }, [isDragging]);
  
  const renderItem = () => {
    switch (itemType) {
      case "box":
        return <BoxDragPreview item={item} canvasWidth={canvasWidth} canvasHeight={canvasHeight}/>;
      default:
        return null;
    }
  }

  return (
    <div className="h-full w-full absolute">
      <div
        style={getItemStyles(
          delta,
          item,
          initialOffset,
          currentOffset,
          initialClientOffset,
          canvasWidth,
          canvasHeight
        )}
      >
        {renderItem()}
      </div>
    </div>
  );
};
