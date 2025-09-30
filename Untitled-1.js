import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";

export default function ReviewPage() {
  const [reports, setReports] = useState([
    { id: 1, title: "Illegal Parking on Main St.", status: "pending" },
    { id: 2, title: "Reckless Driving - 3rd Ave.", status: "processing" },
    { id: 3, title: "No Helmet Violation - Downtown", status: "closed" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  };

  const getBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "processing":
        return (
          <Badge className="bg-yellow-500 text-white">
            <Clock className="w-4 h-4 mr-1" /> Processing
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle className="w-4 h-4 mr-1" /> Closed
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">Review Reports</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="shadow-lg rounded-2xl">
            <CardContent className="p-4 flex flex-col gap-3">
              <h2 className="text-lg font-semibold">{report.title}</h2>
              <div>{getBadge(report.status)}</div>
              <div className="flex gap-2 mt-2">
                {report.status === "pending" && (
                  <Button
                    onClick={() => handleStatusChange(report.id, "processing")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Mark as Processing
                  </Button>
                )}
                {report.status === "processing" && (
                  <Button
                    onClick={() => handleStatusChange(report.id, "closed")}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Mark as Closed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
