"use client";

import { useCallback, useRef } from "react";

type DragState = {
  active: boolean;
  startX: number;
  moved: boolean;
};

type Options = {
  onSwipe: (direction: -1 | 1) => void;
  threshold?: number;
  onDragStart?: () => void;
  onDragEnd?: (didDrag: boolean) => void;
};

/** Shared mouse/touch drag → left/right swipe for sliders. */
export function useDragSlide({
  onSwipe,
  threshold = 40,
  onDragStart,
  onDragEnd,
}: Options) {
  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    moved: false,
  });

  const onPointerDown = useCallback(
    (clientX: number) => {
      dragRef.current = { active: true, startX: clientX, moved: false };
      onDragStart?.();
    },
    [onDragStart],
  );

  const onPointerMove = useCallback((clientX: number) => {
    if (!dragRef.current.active) return;
    if (Math.abs(clientX - dragRef.current.startX) > 8) {
      dragRef.current.moved = true;
    }
  }, []);

  const onPointerUp = useCallback(
    (clientX: number) => {
      if (!dragRef.current.active) return;
      const dx = clientX - dragRef.current.startX;
      const didDrag = dragRef.current.moved;
      dragRef.current.active = false;

      if (Math.abs(dx) > threshold) {
        onSwipe(dx < 0 ? 1 : -1);
      }

      onDragEnd?.(didDrag);
    },
    [onDragEnd, onSwipe, threshold],
  );

  const wasDragged = useCallback(() => dragRef.current.moved, []);

  const bindDrag = {
    onMouseDown: (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
      e.preventDefault();
      onPointerDown(e.clientX);
    },
    onMouseMove: (e: React.MouseEvent) => onPointerMove(e.clientX),
    onMouseUp: (e: React.MouseEvent) => onPointerUp(e.clientX),
    onMouseLeave: () => {
      if (dragRef.current.active) {
        onPointerUp(dragRef.current.startX);
      }
    },
    onTouchStart: (e: React.TouchEvent) =>
      onPointerDown(e.touches[0]?.clientX ?? 0),
    onTouchMove: (e: React.TouchEvent) =>
      onPointerMove(e.touches[0]?.clientX ?? 0),
    onTouchEnd: (e: React.TouchEvent) =>
      onPointerUp(e.changedTouches[0]?.clientX ?? dragRef.current.startX),
  };

  return { bindDrag, wasDragged, dragRef };
}
