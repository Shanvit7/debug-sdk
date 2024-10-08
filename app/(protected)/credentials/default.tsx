"use client";
// HOOKS
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import useSWR, { mutate } from "swr";
import { useToast } from "@/hooks/use-toast";
// SERVICES
import { getActiveApiKey, generateApiKey } from "@/services/apiKey";
// COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeActivateKeyDialog from "@/components/custom/dialog/deactivate-api-key";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolTip from "@/components/custom/tooltip";
// ASSETS
import { Eye, EyeOff, RotateCcw, Copy } from "lucide-react";

const Credentials = () => {
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  // ACTIVE API KEY QUERY FETCHING
  const { data: { data = {} } = {}, isLoading = true } =
    useSWR("/get-active-api", getActiveApiKey) ?? {};

  const { isActive = false, keyValue = "", _id = null } = data ?? {};

  // API KEY GENERATION MUTATION
  const { trigger: performGenerateKey, isMutating: isActivating = false } =
    useSWRMutation("/api-keys", () => generateApiKey(), {
      onSuccess: () => {
        mutate("/get-active-api");
        toast({
          title: `API Key ${keyValue && "re"}generated successfully`,
        });
      },
    });

  const toggleKeyVisibility = () => setShowKey(!showKey);

  const copyToClipboard = async () => {
    if (!showKey) return;
    try {
      await navigator.clipboard.writeText(keyValue);
      toast({
        title: "API Key has been copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy API Key",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">API Keys</h1>
      <p className="text-md py-2 font-medium">Find your API key details here</p>
      <div>
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Standard Keys</CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <p>These keys will allow you to authenticate API requests.</p>
              <Link
                href="/endpoints"
                className="text-zinc-300 hover:text-primaryGradientStart"
              >
                Learn More
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-10">
              {isLoading ? (
                <Skeleton className="w-1/5 h-8" />
              ) : isActive ? (
                <div className="space-y-2">
                  <b>Secret Key</b>
                  <ToolTip
                    side="top"
                    content={
                      <p>{showKey ? "Click to copy" : "Show key to copy"}</p>
                    }
                  >
                    <div className="relative">
                      <Input
                        type={showKey ? "text" : "password"}
                        value={showKey ? keyValue : "*".repeat(64)}
                        className={showKey ? "pr-10" : ""}
                        readOnly
                        onClick={showKey ? copyToClipboard : undefined}
                      />
                      {showKey && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 w-8 h-8 hover:bg-transparent hover:text-primaryGradientStart"
                          onClick={copyToClipboard}
                          aria-label="Copy API key"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </ToolTip>

                  <div className="flex items-center gap-2 py-4">
                    <Button
                      variant="secondary"
                      onClick={toggleKeyVisibility}
                      className="h-8 flex gap-2 items-center"
                      aria-label={showKey ? "Hide API key" : "Show API key"}
                    >
                      {showKey ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Show
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={performGenerateKey}
                      variant="secondary"
                      className="h-8 flex items-center gap-2"
                      disabled={isActivating}
                    >
                      <RotateCcw className="h-4 w-4" /> Regenerate
                    </Button>
                    <DeActivateKeyDialog id={_id}>
                      <Button variant="destructive">Deactivate</Button>
                    </DeActivateKeyDialog>
                  </div>
                </div>
              ) : (
                <Button
                  disabled={isActivating}
                  variant="secondary"
                  className="h-8"
                  onClick={performGenerateKey}
                >
                  {isActivating ? "Generating..." : "Generate Secret Key"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Credentials;
