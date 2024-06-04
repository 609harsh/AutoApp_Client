/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { BsTextareaResize } from 'react-icons/bs';
import { FaToggleOn } from 'react-icons/fa';
import { IoIosCheckbox, IoIosRadioButtonOn } from 'react-icons/io';
import { IoTextOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { MdOutlinePassword } from 'react-icons/md';
import { PiNumberOneFill } from 'react-icons/pi';
import { RxButton, RxInput } from 'react-icons/rx';
import { Rnd } from 'react-rnd';

import { DraggableBoxPropsType } from '../../interfaces/container.interface';
import BoxComponent from './Box.component';
import BoxOptions from './BoxOptions.component';

const AllIcons: Record<string, IconType> = {
  Button: RxButton,
  Text: IoTextOutline,
  TextInput: RxInput,
  NumberInput: PiNumberOneFill,
  PasswordInput: MdOutlinePassword,
  Checkbox: IoIosCheckbox,
  RadioButton: IoIosRadioButtonOn,
  ToggleSwitch: FaToggleOn,
  TextArea: BsTextareaResize
};

const NO_OF_GRIDS = 43;

export const DraggableBox = memo<DraggableBoxPropsType>(
  ({
    onResizeStop,
    onDragStop,
    inCanvas,
    canvasWidth,
    canvasHeight,
    key,
    id,
    component,
    box,
    mode,
    resizingStatusChanged,
    draggingStatusChanged
  }) => {
    const [isResizing, setResizing] = useState(false);
    const [isDragging2, setDragging] = useState(false);
    const [showBoxOptions, setShowBoxOptions] = useState(false);
    const gridWidth = Number(canvasWidth)/NO_OF_GRIDS;
    const gridHeight = Number(canvasHeight)/NO_OF_GRIDS;

    function handleShowBoxOptions() {
      setShowBoxOptions((prev) => !prev);
    }

    const [{ isDragging }, drag, preview] = useDrag(
      () => ({
        type: 'box',
        item: {
          ...box,
          parent,
          canvasWidth,
          id,
          component: box
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        })
      }),
      [id, parent, canvasWidth]
    );

    useEffect(() => {
      if (resizingStatusChanged) {
        resizingStatusChanged(isResizing);
      }
    }, [isResizing]);

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: true });
    }, [isDragging]);

    useEffect(() => {
      if (draggingStatusChanged) {
        draggingStatusChanged(isDragging2);
      }
    }, [isDragging2]);

    const IconToRender = AllIcons[box.component];

    return (
      <>
        {inCanvas && box ? (
          <Rnd
            key={key}
            onMouseEnter={handleShowBoxOptions}
            onMouseLeave={handleShowBoxOptions}
            dragGrid={[gridWidth, gridHeight]}
            resizeGrid={[gridWidth, gridHeight]}
            className={`flex flex-col items-center justify-center p-1 ${showBoxOptions && mode!=="edit" && 'border border-solid border-blue-400'}`}
            maxWidth={canvasWidth}
            onDragStop={(e, direction) => {
              setDragging(false);
              onDragStop(e, id, direction);
            }}
            onResizeStop={(e, direction, ref, d, position) => {
              setResizing(false);
              onResizeStop(id, e, direction, ref, d, position);
            }}
            position={{
              x: box ? (box.left * canvasWidth) / 100 : 0,
              y: box ? box.top : 0
            }}
            onResize={() => setResizing(true)}
            onDrag={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isDragging2) {
                setDragging(true);
              }
            }}
            size={{
              width: box?.width * gridWidth,
              height: box?.height * gridHeight
            }}
            bounds="parent"
            disableDragging={mode==="edit"}
            enableResizing={mode!=="edit"}
          >
            <div className="relative h-full w-full" ref={preview}>
              {showBoxOptions && mode!=="edit" && <BoxOptions box={box} />}
              <BoxComponent box={box} />
            </div>
          </Rnd>
        ) : (
          <div
            className="flex h-[4.5rem] w-[4.5rem] cursor-grab flex-col items-center"
            ref={drag}
            role="DraggableBox"
          >
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-100 text-xl">
              {<IconToRender className="text-2xl Saving changes..."></IconToRender>}
            </div>
            <p className="mt-1 text-[.6rem] text-primary">{box.displayName}</p>
          </div>
        )}
      </>
    );
  }
);
