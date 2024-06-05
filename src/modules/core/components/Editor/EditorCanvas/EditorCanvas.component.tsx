import { useCallback, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Layout, Spin, Typography } from 'antd';
import { produce } from 'immer';
import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import { DropTargetMonitor, useDrop } from 'react-dnd';
// @ts-ignore
import GridLines from 'react-gridlines';
import { Position, ResizableDelta } from 'react-rnd';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import {
  useFetchComponentsQuery,
} from '../../../../shared/apis/componentApi';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { useEditor } from '../../../../shared/hooks/useEditor';
import { Box, DraggableBoxPropsType } from '../../../interfaces/container.interface';
import { Direction, DraggableData } from '../../../interfaces/editor.interface';
import { setBoxes } from '../../../reducers/editor.reducer';
import { DraggableBox } from '../../DraggableBox/dragglebox.component';
import { componentTypes } from '../WidgetManager/widgetsComponents';
import { getCanvasDimension, convertXToPercentage } from '../../../utils/editorUtils';
import { CustomDragLayer } from '../CustomDragLayer.component';

const NO_OF_GRIDS = 43;

const { Content } = Layout;
const { Text } = Typography;

const EditorCanvas: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { boxes } = useEditor();
  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const gridWidth = Number(canvasWidth) / NO_OF_GRIDS;
  const gridHeight = Number(canvasHeight) / NO_OF_GRIDS;

  const { isLoading, isFetching } = useFetchComponentsQuery(id || '');

  useEffect(() => {
    setCanvasWidth(getCanvasDimension("real-canvas", "width"));
    window.addEventListener('resize', () => setCanvasWidth(getCanvasDimension("real-canvas", "width")));
  }, [canvasWidth]);

  useEffect(() => {
    setCanvasHeight(getCanvasDimension("real-canvas", "height"));
    window.addEventListener('resize', () => setCanvasHeight(getCanvasDimension("real-canvas", "height")));
    console.log("Canvas Height: ", canvasHeight);
  }, [canvasHeight]);

  const defaultData: { top: number; left: number; width: number; height: number } = {
    top: 100,
    left: 0,
    width: 6,
    height: 4
  };

  const resizingStatusChanged = useCallback(
    (status: boolean) => {
      setIsResizing(status);
    },
    [setIsResizing]
  );

  const draggingStatusChanged = useCallback(
    (status: boolean) => {
      setIsDragging(status);
    },
    [setIsDragging]
  );

  const onDragStop = useCallback(
    (e: any, componentId: number, direction: DraggableData) => {
      // Get the width of the canvas
      console.log(e)
      const canvasBounds = document
        .getElementsByClassName('real-canvas')[0]
        .getBoundingClientRect();
      const canvasWidth = canvasBounds?.width;
      const nodeBounds = direction.node.getBoundingClientRect();

      // Computing the left offset
      const leftOffset = nodeBounds.x - canvasBounds.x;
      const currentLeftOffset = boxes[componentId]?.left;
      const leftDiff = currentLeftOffset - convertXToPercentage(leftOffset, canvasWidth);

      // Computing the top offset
      const topDiff = boxes[componentId]?.top - (nodeBounds.y - canvasBounds.y);

      let newBoxes = { ...boxes };

      if (topDiff != 0 || leftDiff != 0) {
        newBoxes = produce(newBoxes, (draft: any) => {
          if (draft[componentId]) {
            const topOffset = draft[componentId].top;
            const leftOffset = draft[componentId].left;
            draft[componentId].top = topOffset - topDiff;
            draft[componentId].left = leftOffset - leftDiff;
          }
        });
        dispatch(setBoxes(newBoxes));
      }
    },
    [boxes]
  );

  const onResizeStop = useCallback(
    (
      componentId: string,
      e: any,
      direction: Direction,
      ref: React.ElementRef<'div'>,
      d: ResizableDelta,
      position: Position
    ) => {
      console.log(e,direction,ref)
      const deltaWidth = Math.round(d.width / gridWidth) * gridWidth; //rounding of width of element to nearest multiple of gridWidth
      const deltaHeight = d.height;

      if (deltaWidth === 0 && deltaHeight === 0) {
        return;
      }

      let { x, y } = position;
      x = Math.round(x / gridWidth) * gridWidth;
      y = Math.round(y / gridHeight) * gridHeight;

      let {
        left: boxLeft,
        top: boxTop,
        width: boxWidth,
        height: boxHeight
      } = boxes[componentId] || defaultData;

      const boundingRect = document
        .getElementsByClassName('real-canvas')[0]
        .getBoundingClientRect();
      const canvasWidth = boundingRect?.width;
      let newWidth = boxWidth + (deltaWidth / gridWidth);

      boxHeight = boxHeight + (deltaHeight / gridHeight);
      if (boxHeight < boxes[componentId].defaultSize.height)
        boxHeight = boxes[componentId].defaultSize.height;
      if (newWidth < boxes[componentId].defaultSize.width)
        newWidth = boxes[componentId].defaultSize.width;

      boxTop = y;
      boxLeft = (x * 100) / canvasWidth;

      let newBoxes = {
        ...boxes,
        [componentId]: {
          ...boxes[componentId],
          width: newWidth,
          height: boxHeight,
          left: boxLeft,
          top: boxTop
        }
      };
      dispatch(setBoxes(newBoxes));
    },
    [boxes, gridWidth]
  );

  function computeComponentName(componentType: string, currentComponents: { [id: string]: Box }) {
    const currentComponentsForKind = Object.values(currentComponents).filter(
      (box) => box.component === componentType
    );
    let found = false;
    let componentName = '';
    let currentNumber = currentComponentsForKind.length + 1;

    while (!found) {
      componentName = `${componentType.toLowerCase()}${currentNumber}`;
      if (
        Object.values(currentComponents).find((box) => box.name === componentName) === undefined
      ) {
        found = true;
      }
      currentNumber = currentNumber + 1;
    }

    return componentName;
  }

  const addNewWidgetToTheEditor = (
    componentMeta: any,
    eventMonitorObject: DropTargetMonitor,
    currentComponents: { [id: string]: Box },
    canvasBoundingRect: DOMRect
  ) => {
    const componentMetaData = cloneDeep(componentMeta);
    const componentData = cloneDeep(componentMetaData);

    const defaultWidth = componentMetaData.defaultSize.width;
    const defaultHeight = componentMetaData.defaultSize.height;
    componentData.defaultSize.height = defaultHeight;

    componentData.name = computeComponentName(componentData.component, currentComponents);

    let left = 0;
    let top = 0;

    const offsetFromTopOfWindow = canvasBoundingRect.top;
    const offsetFromLeftOfWindow = canvasBoundingRect.left;
    const currentOffset = eventMonitorObject.getSourceClientOffset() || { x: 0, y: 0 };
    const subContainerWidth = canvasBoundingRect.width;

    left = gridWidth * Math.round((currentOffset?.x - offsetFromLeftOfWindow)/gridWidth);
    top = gridHeight * Math.round((currentOffset?.y - offsetFromTopOfWindow)/gridHeight);

    left = (left * 100) / subContainerWidth;

    let newComponent = {
      id: v4(),
      top: top,
      left: left,
      width: defaultWidth,
      height: defaultHeight,
      ...componentData
    };

    return newComponent;
  };

  const moveBox = useCallback(
    (id: string, layouts: Box) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { ...layouts }
          }
        })
      );
    },
    [boxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ['box'],
      async drop(item: any, monitor: DropTargetMonitor) {
        const canvasBoundingRect = document
          .getElementsByClassName('real-canvas')[0]
          .getBoundingClientRect();


        const componentMeta = cloneDeep(
          componentTypes.find((component) => component.component === item.component.component)
        );

        const newComponent = addNewWidgetToTheEditor(
          componentMeta,
          monitor,
          boxes,
          canvasBoundingRect
        );

        const newBoxes = {
          ...boxes,
          [newComponent.id]: {
            ...newComponent
          }
        };
        dispatch(setBoxes(newBoxes));
      }
    }),
    [moveBox]
  );

  const isOverlayVisible = isLoading || isFetching;

  return (
    <>
    <Content>
      <Flex className="h-full w-full">
        <div className="relative h-full w-full">
          <CustomDragLayer canvasWidth={canvasWidth} canvasHeight={canvasHeight} onDragging={(isDragging) => setIsDragging(isDragging)}/>
          {isOverlayVisible && (
            <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center !bg-secondary p-10">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
          )}
          <GridLines className="h-full w-full" cellWidth={(isResizing || isDragging) ? gridWidth : 0} cellHeight={(isResizing || isDragging) ? gridHeight : 0} lineColor="#d9d9d9">
            <div
              id="real-canvas"
              className="real-canvas relative flex h-full w-full items-center bg-secondary/50"
              ref={drop}
              >
              {Object.keys(boxes)?.map((key) => {
                const box = boxes[key];
                const DraggableBoxProps: DraggableBoxPropsType = {
                  onDragStop,
                  onResizeStop,
                  inCanvas: true,
                  canvasWidth: canvasWidth,
                  canvasHeight: canvasHeight,
                  id: box.id,
                  box,
                  resizingStatusChanged,
                  draggingStatusChanged
                };
                return <DraggableBox {...DraggableBoxProps} />;
              })}
              {Object.keys(boxes).length === 0 && !isDragging && (
                <div className="mx-auto flex h-1/3 w-full max-w-2xl items-center justify-center rounded-xl border-[1px] border-dashed border-border bg-slate-50 p-5 shadow-sm">
                  <Text className="!m-0 w-full max-w-md text-center text-lg font-medium text-foreground/75">
                    You haven&apos;t added any components yet. Drag components from the right
                    sidebar and drop here.
                  </Text>
                </div>
              )}
            </div>
          </GridLines>
        </div>
      </Flex>
    </Content>
              </>
  );
};

export default EditorCanvas;
