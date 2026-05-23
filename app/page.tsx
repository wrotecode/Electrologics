import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold">
        ElectroLogics
      </h1>

      <p className="mt-4 text-xl text-gray-600">
        Your Electronics Store
      </p>

      <Link
        href="/products"
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
      >
        Shop Now
      </Link>
    </div>
  );
}