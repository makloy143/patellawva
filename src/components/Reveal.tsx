import {
  type ElementType,
  type ReactNode,
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from 'react';

type Props<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export default function Reveal<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  ...rest
}: Props<T>) {
  const Component = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const r = node.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Component
      ref={ref as never}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ' ' + className : ''}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
