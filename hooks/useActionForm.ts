"use client";

import { startTransition, useActionState } from "react";
import { useForm, type FieldValues, type Resolver } from "react-hook-form";

// Kết hợp react-hook-form (validate phía client) với Server Action (useActionState).
//
// Không dùng <form action={...}>: React 19 tự xoá trắng form sau MỌI lần action chạy xong,
// kể cả khi server trả về lỗi → người dùng mất hết nội dung đã nhập. Ở đây form chỉ được
// reset khi component gọi form.reset() lúc thành công.
export function useActionForm<TValues extends FieldValues, TState>(
  action: (prevState: Awaited<TState>, formData: FormData) => TState | Promise<TState>,
  initialState: Awaited<TState>,
  resolver: Resolver<TValues>,
) {
  const [state, dispatch, pending] = useActionState(action, initialState);
  const form = useForm<TValues>({ resolver, mode: "onBlur" });

  const onSubmit = form.handleSubmit((_values, event) => {
    // Gửi nguyên FormData (kể cả các ô ẩn như honeypot) để Server Action tự validate lại.
    const formData = new FormData(event?.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  });

  return { state, pending, form, onSubmit };
}
