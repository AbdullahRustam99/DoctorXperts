"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Image from "next/image";
import React from "react";
import {
  LayoutDashboard,
  FileText,
  CalendarClock,
  Settings,
  ClipboardList,
  Droplet,
  HeartPulse,
  GaugeCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type MetricCardProps = {
  title: string;
  value: string;
  status: string;
  icon: React.ReactNode;
  color: string;
};

function MetricCard({ title, value, status, icon, color }: MetricCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
      <div className={`mb-2 ${color}`}>{icon}</div>
      <h2 className="text-sm font-medium text-primary mb-1">{title}</h2>
      <p className="text-2xl font-semibold text-primary">{value}</p>
      <p className={`text-xs mt-1 ${color}`}>{status}</p>
    </div>
  );
}

export default function HealthDashboard() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Purana chart destroy karo
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    }
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan 1",
          "Jan 3",
          "Jan 5",
          "Jan 7",
          "Jan 9",
          "Jan 11",
          "Jan 13",
        ],
        datasets: [
          {
            label: "Aerobics",
            backgroundColor: "#f87171",
            data: [30, 40, 50, 60, 50, 40, 30],
          },
          {
            label: "Yoga",
            backgroundColor: "#fbbf24",
            data: [20, 30, 40, 50, 60, 50, 40],
          },
          {
            label: "Meditation",
            backgroundColor: "#60a5fa",
            data: [10, 20, 30, 40, 30, 20, 10],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-[#edf4ee] to-[#e6eaf0] p-4">
      <div className="grid grid-cols-1 xl:grid-cols-[80px_1fr_340px] gap-4">

        {/* Sidebar */}
        <aside className="bg-white rounded-2xl flex flex-col items-center py-6 space-y-6 shadow text-primary">
          <Image src="/images/logo.png" alt="Body" width={40} height={40} />
          <LayoutDashboard className="w-6 h-6" />
          <FileText className="w-6 h-6" />
          <CalendarClock className="w-6 h-6" />
          <Settings className="w-6 h-6" />
          <ClipboardList className="w-6 h-6" />
        </aside>

        {/* Main Content */}
        <main className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Health Overview
              </h1>
              <p className="text-sm text-primary/80">July 17 2025</p>
            </div>
            <div className="flex items-center space-x-2 text-primary">
              <button
                onClick={() => {
                  const text = document.getElementById("searchText");
                  if (text) text.classList.toggle("hidden");
                }}
                className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
              >
                🔍
              </button>

              <p id="searchText" className="text-sm  hidden">
                Search
              </p>
            </div>
          </div>

          {/* Top Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard
              title="Blood Sugar"
              value="80 mg / dL"
              status="Normal"
              icon={<Droplet />}
              color="text-secondary"
            />
            <MetricCard
              title="Heart Rate"
              value="98 bpm"
              status="Normal"
              icon={<HeartPulse />}
              color="text-red-500"
            />
            <MetricCard
              title="Blood Pressure"
              value="102 / 72 mmHg"
              status="Normal"
              icon={<GaugeCircle />}
              color="text-primary"
            />
          </div>

          {/* Chart */}
          <div className="bg-white p-4 rounded-xl shadow mb-4 text-primary  ">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold ">Activity Growth</h3>
              <select className="text-sm bg-gray-100 px-2 py-1 rounded">
                <option>Jan 2025</option>
              </select>
            </div>
            <canvas ref={chartRef} height={150}></canvas>
            <div className="flex justify-center space-x-4 mt-4 text-x ">
              <span className="text-red-500">● Aerobics</span>
              <span className="text-secondary">● Yoga</span>
              <span className="text-primary">● Meditation</span>
            </div>
          </div>

          {/* Appointment */}
          <div className="px-4">
            <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary/20 text-secondary rounded-full p-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-primary">Upcoming Appointment</p>
                  <p className="text-base font-semibold text-primary">
                    Consultation with Dr. Ather
                  </p>
                </div>
              </div>
              <div className="text-right">
                <button className="bg-secondary text-primary text-xs px-3 py-1 rounded-full hover:bg-emerald-600 transition">
                  View
                </button>
                <p className="text-xs text-gray-500 mt-2">August 17, 2025</p>
              </div>
            </div>
          </div>
        </main>

        {/* Right Side BMI Panel */}
        <aside className="bg-primary text-white rounded-2xl p-4 flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Body Mass Index (BMI)</h2>
            <select className="bg-[#0f0f52] px-2 py-1 text-sm rounded">
              <option>Last Week</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Height</span>
              <span>170 cm</span>
            </div>
            <div className="flex justify-between">
              <span>Weight</span>
              <span>72 kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">BMI</span>
              <span className="text-xl font-bold">24.9</span>
            </div>
            <div className="w-full bg-secondary/40 h-2 rounded-full">
              <div
                className="bg-secondary h-2 rounded-full"
                style={{ width: "38%" }}
              ></div>
            </div>
            <p className="text-xs text-secondary">You{"'"}re Healthy</p>
          </div>

          {/* Body Shape & Image */}
          <div>
            <h3 className="font-semibold">Body Measurements</h3>
            <p className="text-xs text-gray-300 mb-1">
              Last checked 2 Days Ago
            </p>
            <span className="inline-block px-2 py-1 bg-[#0f0f52] text-xs rounded mb-2">
              Inverted Triangle Body Shape
            </span>

            <Image
              src="/images/Body_pain.png"
              alt="Body"
              width={240}
              height={240}
              className="mx-auto mb-4"
            />

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white text-primary p-2 rounded">
                <p className="text-xs">Chest (in)</p>
                <p className="font-bold text-lg">44.5</p>
                <span className="text-red-500 text-xs">▲</span>
              </div>
              <div className="bg-white text-primary p-2 rounded">
                <p className="text-xs">Waist (in)</p>
                <p className="font-bold text-lg">34</p>
                <span className="text-green-500 text-xs">▼</span>
              </div>
              <div className="bg-white text-primary p-2 rounded">
                <p className="text-xs">Hip (in)</p>
                <p className="font-bold text-lg">42.5</p>
                <span className="text-green-500 text-xs">▼</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-auto">
            © 2025 DOCTOR XPERT
          </p>
          <Image
            src="/images/logo.png"
            alt="Body"
            width={600}
            height={600}
            className="bg-white/30 rounded-xl shadow-md"
          />
        </aside>
      </div>
    </div>
    <Footer/>
    </>

  );
}
