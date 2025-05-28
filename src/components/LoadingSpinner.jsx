export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );
}
