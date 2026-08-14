import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../lib/auth";
import {
  BrandMark,
  Button,
  Card,
  ErrorText,
  Field,
  Muted,
  Screen,
} from "../components/ui";
import { colors, fonts } from "../lib/theme";

const PASSWORD_MIN_LENGTH = 8;

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  // No `role`. The picker that used to be here sent the chosen role to the API,
  // which trusted it — so anyone could sign up as an instructor and author
  // content. Instructor accounts are provisioned server-side.
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit() {
    setError("");
    setBusy(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      router.replace("/welcome");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.password.length >= PASSWORD_MIN_LENGTH &&
    !busy;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen>
        <BrandMark subtitle="Create an account and your adaptive path starts with your first quiz." />
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
            placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
          />
          {/* Stated up front rather than only as a rejection after submitting. */}
          {form.password && form.password.length < PASSWORD_MIN_LENGTH ? (
            <Muted>Passwords need at least {PASSWORD_MIN_LENGTH} characters.</Muted>
          ) : null}
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
