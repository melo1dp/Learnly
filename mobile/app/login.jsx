import { useEffect, useRef, useState } from "react";
import { Animated, KeyboardAvoidingView, Platform } from "react-native";
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

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  async function onSubmit() {
    setError("");
    setBusy(true);
    try {
      await login(email.trim(), password);
      router.replace("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen center>
        <Animated.View
          style={{ opacity: fade, transform: [{ translateY: slide }], gap: 16 }}
        >
          <BrandMark subtitle="Sign in to continue your adaptive study plan." />

          <Card>
            <Field
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              placeholder="you@example.com"
            />
            <Field
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="current-password"
              textContentType="password"
              onSubmitEditing={onSubmit}
              returnKeyType="go"
              placeholder="Enter your password"
            />
            <ErrorText>{error}</ErrorText>
            <Button
              title={busy ? "Signing in…" : "Sign in"}
              onPress={onSubmit}
              disabled={busy}
            />
          </Card>

          <Muted style={{ textAlign: "center" }}>
            No account?{" "}
            <Link
              href="/register"
              style={{ color: colors.accent, fontFamily: fonts.bodySemi }}
            >
              Create one
            </Link>
          </Muted>
          <Muted style={{ fontSize: 12, textAlign: "center" }}>
            Use your registered account, or the seeded student/instructor
            accounts after resetting the database.
          </Muted>
        </Animated.View>
      </Screen>
    </KeyboardAvoidingView>
  );
}
