"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { RouteNames, replaceRouteName } from "@/constraints/route-name";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmptyState from "@/components/common/app-empty-state";
import AppClientPagination from "@/components/common/app-client-pagination";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const statusOptions = ["All", "Draft", "Submitted"];

function WritingTableHistory() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>(statusOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPages, _] = useState(10);
  const router = useRouter();
  const posts = [
    {
      id: 1,
      title: "My First Post",
      status: "Draft",
      createdAt: "Feb 1, 2025",
      updatedAt: "Feb 1, 2025",
    },
    {
      id: 2,
      title: "AI Generated Essay",
      status: "Submitted",
      createdAt: "Feb 2, 2025",
      updatedAt: "Feb 3, 2025",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusFilter = (value: string) => {
    setStatus(value === "All" ? "" : value);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = !status || post.status === status;
    return matchesSearch && matchesStatus;
  });

  const handlePageChange = useCallback((page: number) => {
    console.log("handlePageChange", page);
    setPage(page);
  }, []);

  const handleStartExercise = () => {
    router.push(RouteNames.Writing);
  };

  return (
    <div className="w-full">
      <div className="my-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={handleSearch}
            style={{ width: "300px" }}
          />
          <Select value={status || "All"} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link href={RouteNames.Writing} className="md:ml-auto">
          <Button size="sm">
            <PlusIcon className="size-4" />
            <span>New Writing</span>
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                <EmptyState
                  description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                  onAction={handleStartExercise}
                  actionText="Tiến hành làm bài tập ngay"
                />
              </TableCell>
            </TableRow>
          ) : (
            filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{post.status}</Badge>
                </TableCell>
                <TableCell>{post.createdAt}</TableCell>
                <TableCell>{post.updatedAt}</TableCell>
                <TableCell className="space-x-2 text-right">
                  {post.status === "Draft" ? (
                    <Link
                      href={replaceRouteName(RouteNames.WritingEdit, {
                        id: post.id.toString(),
                      })}
                    >
                      <Button variant="outline" size="sm">
                        Continue Edit
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href={replaceRouteName(RouteNames.WritingDetail, {
                        id: post.id.toString(),
                      })}
                    >
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex w-full justify-end pt-8">
        <AppClientPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default WritingTableHistory;
