"""FastAPI Application entrypoint for Vultr BlastShield."""
import json
import asyncio
from typing import List, Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.models.schemas import ExecutionRequest, ExecutionResult, ExecutionStep
from app.agent.orchestrator import AgentOrchestrator
from app.sandbox.containment_scenarios import get_scenario_list
from app.sandbox.manager import SandboxManager

app = FastAPI(
    title="Vultr BlastShield API",
    description="Autonomous Agent Execution & Containment Control Plane on Vultr",
    version="1.0.0"
)

# CORS configuration
origins = [origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()]
if not origins or "*" in origins:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = AgentOrchestrator()


@app.get("/api/health")
async def health_check():
    """Health and status endpoint for system overview."""
    sandbox = SandboxManager.get_sandbox()
    has_vultr_key = orchestrator.vultr_client.has_api_key()
    return {
        "status": "healthy",
        "service": "Vultr BlastShield Control Plane",
        "vultr_inference": {
            "endpoint": settings.vultr_inference_endpoint,
            "model": settings.vultr_inference_model,
            "connected": has_vultr_key,
            "mode": "Live Vultr Serverless API" if has_vultr_key else "Simulated Intelligent Fallback"
        },
        "sandbox": {
            "active_backend": sandbox.__class__.__name__,
            "memory_limit_mb": settings.sandbox_memory_limit_mb,
            "timeout_seconds": settings.sandbox_timeout_seconds,
            "cpu_quota": settings.sandbox_cpu_quota,
            "network_isolation": "Strict (Zero Egress)",
            "containment_policy": "Blast Radius Zero"
        }
    }


@app.get("/api/scenarios")
async def list_scenarios():
    """Get preset containment attack vectors for the Hackathon demo."""
    return get_scenario_list()


@app.get("/api/datasets")
async def list_datasets():
    """List available demo datasets."""
    datasets = []
    if settings.demo_dir.exists():
        for p in settings.demo_dir.glob("*.csv"):
            datasets.append({
                "name": p.name,
                "size_kb": round(p.stat().st_size / 1024, 2)
            })
    return datasets


@app.post("/api/execute", response_model=ExecutionResult)
async def execute_task(request: ExecutionRequest):
    """Execute an agent task synchronously and return all steps, metrics, and artifacts."""
    try:
        result = await orchestrator.execute_task(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.websocket("/ws/execute")
async def websocket_execute(websocket: WebSocket):
    """Stream live step-by-step agent thinking, AST verification, and sandbox output."""
    await websocket.accept()
    try:
        data_text = await websocket.receive_text()
        request_dict = json.loads(data_text)
        request = ExecutionRequest(**request_dict)

        async def step_callback(step: ExecutionStep):
            await websocket.send_json({
                "type": "step",
                "step": step.model_dump()
            })

        result = await orchestrator.execute_task(request, on_step_update=step_callback)
        await websocket.send_json({
            "type": "complete",
            "result": result.model_dump()
        })
    except WebSocketDisconnect:
        pass
    except Exception as e:
        try:
            await websocket.send_json({
                "type": "error",
                "error": str(e)
            })
        except Exception:
            pass
    finally:
        try:
            await websocket.close()
        except Exception:
            pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.backend_host, port=settings.backend_port, reload=True)
