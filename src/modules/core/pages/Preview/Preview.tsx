import { useEffect, useState } from "react";
import { useFetchComponentsQuery } from "../../../shared/apis/componentApi";
import { useParams } from "react-router-dom";
import { DraggableBox } from "../../components/DraggableBox/dragglebox.component";
import { DraggableBoxPropsType } from "../../interfaces/container.interface";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Flex } from "antd";
import { getCanvasDimension } from "../../utils/editorUtils";

const Preview = () => {
  const { id } = useParams();
  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(100);

  const {
    data: boxes,
    isLoading,
    isSuccess,
    refetch
  } = useFetchComponentsQuery(id);

  useEffect(() => {
    refetch()
  }, [isSuccess]);

  useEffect(() => {
    setCanvasWidth(getCanvasDimension("preview-space", "width"));
    window.addEventListener('resize', () => setCanvasWidth(getCanvasDimension("preview-space", "width")));
  }, [canvasWidth]);

  useEffect(() => {
    setCanvasHeight(getCanvasDimension("preview-space", "height"));
    window.addEventListener('resize', () => setCanvasHeight(getCanvasDimension("preview-space", "height")));
  }, [canvasHeight]);

  return (
    <DndProvider backend={HTML5Backend}>

    <Flex className="h-screen w-screen relative preview-space bg-slate-200">
      {
         Object.keys(boxes)?.length > 0 &&
        Object.keys(boxes)?.map((key) => {
          const box = boxes[key];
          const DraggableBoxProps: DraggableBoxPropsType = {
            mode: "edit",
            inCanvas: true,
            box,
            id: box.id,
            canvasWidth,
            canvasHeight
          };
          return <DraggableBox {...DraggableBoxProps} />;
        })
      }

    </Flex>
      </DndProvider>
  )
}

export default Preview