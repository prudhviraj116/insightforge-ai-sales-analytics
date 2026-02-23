import KPIBox from "./ui/KPIBox";
import GlassInsightCard from "./ui/GlassInsightCard";
import RevenueChart from "./charts/RevenueChart";
import ProductChart from "./charts/ProductChart";
import RegionChart from "./charts/RegionChart";

function ChartsSection({ data, openInsight }) {

  return (
    <div className="space-y-12">

      <div className="grid grid-cols-3 gap-6">
        <KPIBox title="Total Revenue" value={data.kpis.total_revenue} />
        <KPIBox title="Total Orders" value={data.kpis.total_orders} />
        <KPIBox title="Top Product" value={data.kpis.top_product} />
      </div>

      <GlassInsightCard text="Revenue trending upward. Consider expanding top region." />

      <div className="grid grid-cols-2 gap-8">
        <RevenueChart data={data.revenue_trend} />
        <ProductChart data={data.product_analysis} />
      </div>

      <RegionChart data={data.region_analysis} />

      <button
        onClick={openInsight}
        className="bg-white text-black px-4 py-2 rounded-lg"
      >
        View Detailed Insights
      </button>

    </div>
  );
}

export default ChartsSection;
