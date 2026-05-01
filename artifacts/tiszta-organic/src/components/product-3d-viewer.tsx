import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Box, RotateCw, ZoomIn } from "lucide-react";
import productFrontImg from "@assets/WhatsApp_Image_2026-05-02_at_2.15.52_AM_1777668487991.jpeg";
import productBackImg from "@assets/WhatsApp_Image_2026-05-02_at_2.15.53_AM_1777668487989.jpeg";

/* ─────────────────────────────────────────────
   CSS 3D product box — works on every device
   without WebGL / GPU requirement
───────────────────────────────────────────── */

const DEPTH = 80; // px — thickness of the "pouch"

interface CSS3DBoxProps {
  size?: number;
  autoSpin?: boolean;
}

function CSS3DBox({ size = 320, autoSpin = true }: CSS3DBoxProps) {
  const rotX = useMotionValue(-8);
  const rotY = useMotionValue(20);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const spinAnim = useRef<ReturnType<typeof animate> | null>(null);
  const currentY = useRef(20);

  const w = size;
  const h = Math.round(size * 1.42); // ~aspect ratio of the pouch

  /* start/stop idle spin */
  const startSpin = useCallback(() => {
    if (!autoSpin) return;
    spinAnim.current?.stop();
    const target = currentY.current + 360;
    spinAnim.current = animate(rotY, target, {
      duration: 9,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (v) => { currentY.current = v; },
    });
  }, [autoSpin, rotY]);

  const stopSpin = useCallback(() => {
    spinAnim.current?.stop();
  }, []);

  useEffect(() => {
    startSpin();
    return () => spinAnim.current?.stop();
  }, [startSpin]);

  /* pointer drag handlers */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    stopSpin();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [stopSpin]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    const newY = currentY.current + dx * 0.6;
    const newX = Math.max(-40, Math.min(40, rotX.get() - dy * 0.4));
    currentY.current = newY;
    rotY.set(newY);
    rotX.set(newX);
  }, [rotX, rotY]);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    startSpin();
  }, [startSpin]);

  /* touch handlers */
  const touchStart = useRef({ x: 0, y: 0 });
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    stopSpin();
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, [stopSpin]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    const newY = currentY.current + dx * 0.6;
    const newX = Math.max(-40, Math.min(40, rotX.get() - dy * 0.4));
    currentY.current = newY;
    rotY.set(newY);
    rotX.set(newX);
  }, [rotX, rotY]);

  const onTouchEnd = useCallback(() => {
    startSpin();
  }, [startSpin]);

  const transform = useTransform(
    [rotX, rotY],
    ([rx, ry]) => `rotateX(${rx}deg) rotateY(${ry}deg)`
  );

  const half_w = w / 2;
  const half_h = h / 2;
  const half_d = DEPTH / 2;

  const sideStyle: React.CSSProperties = {
    position: "absolute",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
  };

  return (
    <div
      style={{
        width: w,
        height: h,
        perspective: 900,
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <motion.div
        style={{
          width: w,
          height: h,
          position: "relative",
          transformStyle: "preserve-3d",
          transform,
        }}
      >
        {/* FRONT face — product image */}
        <div style={{ ...sideStyle, width: w, height: h, transform: `translateZ(${half_d}px)` }}>
          <img src={productFrontImg} alt="TISZTA Organic Atta — Front" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
        </div>

        {/* BACK face — label image */}
        <div style={{ ...sideStyle, width: w, height: h, transform: `rotateY(180deg) translateZ(${half_d}px)` }}>
          <img src={productBackImg} alt="TISZTA Organic Atta — Back" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
        </div>

        {/* LEFT face */}
        <div style={{
          ...sideStyle,
          width: DEPTH,
          height: h,
          left: -half_d + half_w - DEPTH,
          top: 0,
          transform: `rotateY(90deg) translateZ(${half_w - half_d}px)`,
          background: "linear-gradient(180deg, #1a5c2a 0%, #0f3b1a 100%)",
        }} />

        {/* RIGHT face */}
        <div style={{
          ...sideStyle,
          width: DEPTH,
          height: h,
          left: half_w - half_d,
          top: 0,
          transform: `rotateY(-90deg) translateZ(${half_w - half_d}px)`,
          background: "linear-gradient(180deg, #1a5c2a 0%, #0f3b1a 100%)",
        }} />

        {/* TOP face — golden yellow */}
        <div style={{
          ...sideStyle,
          width: w,
          height: DEPTH,
          left: 0,
          top: -half_d,
          transform: `rotateX(90deg) translateZ(${half_h - half_d}px)`,
          background: "linear-gradient(90deg, #f0b429 0%, #e09518 100%)",
        }} />

        {/* BOTTOM face */}
        <div style={{
          ...sideStyle,
          width: w,
          height: DEPTH,
          left: 0,
          top: h - half_d,
          transform: `rotateX(-90deg) translateZ(${half_h - half_d}px)`,
          background: "#0f3b1a",
        }} />
      </motion.div>
    </div>
  );
}

/* ── Ground shadow beneath the box ── */
function BoxScene({ size = 280 }: { size?: number }) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <CSS3DBox size={size} autoSpin />
      {/* Elliptical drop shadow */}
      <div
        style={{
          width: size * 0.8,
          height: 18,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 80%)",
          marginTop: 12,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

/* ── Exported homepage section ── */
export function Product3DSection() {
  return (
    <section className="py-24 bg-[#f5f2e8]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-secondary font-bold">
            Interactive Experience
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-4 text-foreground">
            Explore the Product
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Drag or touch the packaging to rotate it in 3D and explore every side.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-sm md:max-w-md bg-gradient-to-br from-[#eef0e7] to-[#f5f0e8] rounded-3xl shadow-2xl overflow-hidden p-10 flex items-center justify-center">
            <BoxScene size={260} />
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-secondary" />
              Drag to rotate
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-secondary" />
              Pinch to zoom on mobile
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── "View in 3D" button + dialog ── */
export function Product3DButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="lg"
        data-testid="button-view-3d"
        className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold"
      >
        <Box className="w-5 h-5" />
        View in 3D
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl w-full p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
          <div className="bg-gradient-to-br from-[#eef0e7] to-[#f5f0e8] p-8 md:p-10 flex flex-col items-center gap-6">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">
                Interactive 3D Model
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-1">
                High Protein Organic Atta
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Drag or touch to rotate — explore every side of the packaging
              </p>
            </div>

            {open && <BoxScene size={280} />}

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-secondary" /> Drag to rotate
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-secondary" /> Pinch on mobile
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
