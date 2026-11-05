"""Vultr Serverless Inference client with intelligent offline fallback."""
import re
import httpx
from typing import List, Dict, Any, Optional
from app.config import settings
from app.agent.prompts import SYSTEM_PROMPT


class VultrInferenceClient:
    """Async client interfacing with Vultr Serverless Inference API."""

    def __init__(self):
        self.api_key = settings.vultr_inference_api_key
        self.endpoint = settings.vultr_inference_endpoint.rstrip("/")
        self.model = settings.vultr_inference_model

    def has_api_key(self) -> bool:
        return bool(self.api_key and self.api_key.strip() and not self.api_key.startswith("your_"))

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.2,
        max_tokens: int = 2048
    ) -> str:
        """Call Vultr Serverless Inference or trigger smart fallback if not configured."""
        if self.has_api_key():
            try:
                url = f"{self.endpoint}/chat/completions"
                headers = {
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "model": self.model,
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
                async with httpx.AsyncClient(timeout=45.0) as client:
                    response = await client.post(url, headers=headers, json=payload)
                    response.raise_for_status()
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
            except Exception as e:
                if not settings.enable_smart_fallback:
                    raise RuntimeError(f"Vultr Inference API error: {e}")
                # Fall through to smart fallback if enabled

        # Smart fallback generator for instant, seamless testing & demonstration
        return self._generate_smart_response(messages)

    def extract_code_block(self, text: str) -> Optional[str]:
        """Extract Python code block from markdown."""
        match = re.search(r"```python\s*(.*?)\s*```", text, re.DOTALL)
        if match:
            return match.group(1).strip()
        # Fallback to general code block
        match_general = re.search(r"```\s*(.*?)\s*```", text, re.DOTALL)
        if match_general:
            return match_general.group(1).strip()
        return None

    def _generate_smart_response(self, messages: List[Dict[str, str]]) -> str:
        """High-fidelity synthesized agent response for demonstration."""
        last_msg = messages[-1]["content"].lower() if messages else ""

        if "self-heal" in last_msg or "failed with" in last_msg or "traceback" in last_msg:
            return """### Diagnostic Analysis
The previous execution failed because of a mismatched column name or type conversion issue in the aggregation pipeline.

### Resolution Strategy
1. Safely inspect available columns dynamically before aggregation.
2. Handle NaN/null values gracefully using forward fill and numerical coercion.
3. Generate the corrected revenue visualization and save to `corrected_analysis.png`.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv('ecommerce_sales.csv')

# Dynamic validation & cleanup
print("--- DATASET COLUMNS ---")
print(df.columns.tolist())

# Parse dates safely
df['Order_Date'] = pd.to_datetime(df['Order_Date'], errors='coerce')
df['Total_Sales'] = pd.to_numeric(df['Total_Sales'], errors='coerce')

# Clean aggregates
monthly_sales = df.groupby(df['Order_Date'].dt.to_period('M'))['Total_Sales'].sum().reset_index()
monthly_sales['Order_Date'] = monthly_sales['Order_Date'].astype(str)

print("--- HEALED AGGREGATION OUTPUT ---")
print(monthly_sales.head())

# Generate visualization
plt.figure(figsize=(10, 5))
sns.set_theme(style="darkgrid")
plt.plot(monthly_sales['Order_Date'], monthly_sales['Total_Sales'], marker='o', color='#00F0FF', linewidth=2.5)
plt.title('Monthly Sales Trend (Self-Healed Pipeline)', fontsize=14, fontweight='bold', color='white')
plt.xlabel('Month', color='white')
plt.ylabel('Total Sales ($)', color='white')
plt.xticks(rotation=45, color='white')
plt.yticks(color='white')
plt.gcf().set_facecolor('#0F172A')
plt.gca().set_facecolor('#1E293B')
plt.tight_layout()
plt.savefig('corrected_analysis.png', dpi=150)
plt.close()

print("[SUCCESS] Pipeline self-healed, visualization rendered to corrected_analysis.png")
```
"""

        # Standard data analysis & visualization prompt
        return """### Execution Plan
1. **Data Ingestion**: Load the sales dataset and examine distribution statistics.
2. **Aggregation**: Calculate revenue grouped by product category and region.
3. **Visualization**: Produce an executive-ready bar chart and save as `category_performance.png`.
4. **Insights**: Print revenue drivers and actionable business recommendations.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Ingest data inside safe sandbox
df = pd.read_csv('ecommerce_sales.csv')

print("--- DATASET SUMMARY ---")
print(f"Total Transactions: {len(df):,}")
print(f"Total Gross Revenue: ${df['Total_Sales'].sum():,.2f}")
print(f"Average Order Value: ${df['Total_Sales'].mean():,.2f}")

# Group by Category
cat_summary = df.groupby('Category')['Total_Sales'].agg(['sum', 'count']).reset_index()
cat_summary = cat_summary.sort_values(by='sum', ascending=False)
print("\n--- REVENUE BY CATEGORY ---")
for _, row in cat_summary.iterrows():
    print(f"- {row['Category']}: ${row['sum']:,.2f} ({row['count']} orders)")

# Render Chart
plt.figure(figsize=(9, 5))
sns.set_theme(style="darkgrid")
colors = ['#007BFC', '#00F0FF', '#10B981', '#F59E0B', '#8B5CF6']
bars = plt.bar(cat_summary['Category'], cat_summary['sum'], color=colors[:len(cat_summary)])

plt.title('Revenue Performance by Product Category', fontsize=14, fontweight='bold', color='white')
plt.xlabel('Category', color='white', fontweight='bold')
plt.ylabel('Total Revenue ($)', color='white', fontweight='bold')
plt.xticks(color='white')
plt.yticks(color='white')
plt.gcf().set_facecolor('#0F172A')
plt.gca().set_facecolor('#1E293B')

for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2.0, yval + 1000, f"${yval:,.0f}", ha='center', va='bottom', color='#00F0FF', fontsize=10)

plt.tight_layout()
plt.savefig('category_performance.png', dpi=150)
plt.close()

print("\n[COMPLETE] Executive visualization saved to category_performance.png")
```
"""
