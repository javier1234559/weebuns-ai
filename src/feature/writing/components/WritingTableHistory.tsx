"use client";

import React from "react";
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
import useSearchQuery from "@/hooks/useSearchQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppNavigation from "@/components/common/app-pagination";
import AppPagination from "@/components/common/app-pagination";

function WritingTableHistory() {
  const { queries, updateQuery } = useSearchQuery();

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

  const statusOptions = ["All", "Draft", "Submitted"];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery({ search: e.target.value });
  };

  const handleStatusFilter = (value: string) => {
    updateQuery({ status: value === "All" ? "" : value });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(queries.search?.toLowerCase() || "");
    const matchesStatus = !queries.status || post.status === queries.status;
    return matchesSearch && matchesStatus;
  });

  const handlePageChange = (page: number) => {
    updateQuery({ page: page.toString() });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-1 items-center gap-4">
          <Input
            placeholder="Search by title..."
            value={queries.search || ""}
            onChange={handleSearch}
            style={{ width: "300px" }}
          />
          <Select
            value={queries.status || "All"}
            onValueChange={handleStatusFilter}
          >
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
        <Link href={RouteNames.WritingCreate} className="ml-auto">
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
          {filteredPosts.map((post) => (
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
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-end pt-8">
        <AppPagination
          currentPage={1}
          totalPages={10}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default WritingTableHistory;
