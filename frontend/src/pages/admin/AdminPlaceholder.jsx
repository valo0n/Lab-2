import AdminLayout from "./AdminLayout";

export default function AdminPlaceholder({ title }) {
  return (
    <AdminLayout title={title}>
      <div className="bg-white rounded-lg border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-primary text-2xl">🚧</span>
        </div>
        <h2 className="text-xl font-bold text-dark mb-2">{title}</h2>
        <p className="text-dark-300 text-sm">
          Ky seksion është në ndërtim. Këtu do vijë menaxhimi i{" "}
          {title.toLowerCase()}.
        </p>
      </div>
    </AdminLayout>
  );
}
