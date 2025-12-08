// src/components/charts/BaseChart.tsx
import { useEffect, useRef, useCallback, useMemo } from "react";
import type { CSSProperties, FC } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import { debounce } from "lodash-es";

export interface BaseChartProps {
  option: EChartsOption;
  style?: CSSProperties;
  className?: string;
  loading?: boolean;
}

const BaseChart: FC<BaseChartProps> = ({
  option,
  style = { width: "100%", height: "100%" },
  className = "",
  loading = false,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // 初始化或更新图表
  const renderChart = useCallback(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    if (loading) {
      chartInstance.current.showLoading();
    } else {
      chartInstance.current.hideLoading();
      chartInstance.current.setOption(option, true);
    }
  }, [option, loading]); 

  // 使用 lodash-es 的 debounce 创建防抖函数
  const handleResize = useCallback(() => {
    chartInstance.current?.resize();
  }, []);

  // 🌟 关键：用 lodash debounce 包裹
  const debouncedResize = useMemo(
    () => debounce(handleResize, 300),
    [handleResize]
  );

  // 初始化 + 监听容器尺寸
  useEffect(() => {
    renderChart();

    if (typeof ResizeObserver !== "undefined" && chartRef.current) {
      const ro = new ResizeObserver(debouncedResize);
      ro.observe(chartRef.current);
      resizeObserverRef.current = ro;
    }

    return () => {
      // 清理 ResizeObserver
      resizeObserverRef.current?.disconnect();
      // 取消防抖 pending 的调用
      debouncedResize.cancel();
      // 销毁 ECharts 实例
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [renderChart, debouncedResize]);

  return (
    <div ref={chartRef} className={`base-chart ${className}`} style={style} />
  );
};

export default BaseChart;
