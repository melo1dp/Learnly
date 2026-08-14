import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../lib/auth";
import {
  BrandMark,
  Button,
  Card,
  Choice,
  ErrorText,
  Field,
  Muted,
  Screen,
} from "../components/ui";
import { colors, fonts } from "../lib/theme";

const ROLES = [
  { value: "student", label: "Student" },
  { value: "instructor", label: "Instructor" },
];

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit() {
    setError("");
    setBusy(true);
    try {
      await register(
        form.name.trim(),
        form.email.trim(),
        form.password,
        form.role,
      );
      router.replace("/welcome");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const canSubmit = form.name && form.email && form.password && !busy;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen>
        <BrandMark subtitle="Choose Student to learn, or Instructor to create courses and lessons." />
        <Card>
          <Field
            label="Name"
            value={form.name}
            onChangeText={set("name")}
            autoComplete="name"
            placeholder="Username"
          />
          <Field
            label="Email"
            value={form.email}
            onChangeText={set("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            placeholder="you@example.com"
          />
          <Field
            label="Password"
            value={form.password}
            onChangeText={set("password")}
            secureTextEntry
            autoComplete="new-password"
            placeholder="Enter password"
          />
          <Choice
            label="Role"
            value={form.role}
            options={ROLES}
            onChange={set("role")}
          />
          <ErrorText>{error}</ErrorText>
          <Button
            title={busy ? "Creating…" : "Create account"}
            onPress={onSubmit}
            disabled={!canSubmit}
          />
          <Muted style={{ textAlign: "center", marginTop: 4 }}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ color: colors.accent, fontFamily: fonts.bodySemi }}
            >
              Sign in
            </Link>
          </Muted>
        </Card>
      </Screen>
    </KeyboardAvoidingView>
  );
}
