"""Static AST security guard and runtime containment policy auditor."""
import ast
import re
from typing import List, Tuple
from app.models.schemas import SecurityViolation, Severity


class SecurityGuard:
    """Pre-execution AST analyzer and static code containment checker."""

    # Disallowed module imports inside the strict sandbox
    RESTRICTED_MODULES = {
        "socket": "Network socket creation is prohibited by Blast Radius Zero policy.",
        "urllib": "Outbound HTTP requests are blocked inside isolated sandbox.",
        "requests": "External network requests prohibited.",
        "httpx": "External HTTP access prohibited.",
        "aiohttp": "Async network connections prohibited.",
        "subprocess": "Spawning system subprocesses is prohibited.",
        "pty": "Pseudo-terminal allocation prohibited.",
        "ctypes": "Direct memory access and C library invocation prohibited.",
        "shutil": "Unrestricted file tree operations prohibited.",
        "webbrowser": "Browser launch from sandbox prohibited.",
    }

    # Dangerous patterns in strings or attributes
    DANGEROUS_ATTRIBUTES = {
        "environ": "Direct environment variable access blocked to prevent secret leakage.",
        "getenv": "Reading system environment secrets is blocked.",
        "system": "Direct shell execution is strictly prohibited.",
        "popen": "Process pipes are prohibited.",
        "spawn": "Process spawning is prohibited.",
    }

    # Forbidden path patterns
    PATH_TRAVERSAL_PATTERN = re.compile(
        r"(\.\./|\.\.\\|/etc/|/root|/var/run|C:\\Windows|C:\\Users)",
        re.IGNORECASE
    )

    @classmethod
    def analyze_code(cls, code: str) -> Tuple[bool, List[SecurityViolation]]:
        """
        Parses code via AST and checks for security violations.
        Returns: (is_safe, list_of_violations)
        """
        violations: List[SecurityViolation] = []

        # 1. Regex check for obvious secret / path / escape attempts
        for match in cls.PATH_TRAVERSAL_PATTERN.finditer(code):
            violations.append(
                SecurityViolation(
                    rule="FILESYSTEM_CONTAINMENT",
                    description=f"Path traversal or restricted system directory attempt detected: '{match.group()}'",
                    severity=Severity.CRITICAL,
                    blocked_payload=match.group(),
                )
            )

        # 2. Syntax / AST check
        try:
            tree = ast.parse(code)
        except SyntaxError as e:
            # Syntax errors are handled by runtime self-healing, not security failure
            return True, violations

        for node in ast.walk(tree):
            # Check imports: import x
            if isinstance(node, ast.Import):
                for alias in node.names:
                    root_pkg = alias.name.split(".")[0]
                    if root_pkg in cls.RESTRICTED_MODULES:
                        violations.append(
                            SecurityViolation(
                                rule="UNAUTHORIZED_MODULE",
                                description=cls.RESTRICTED_MODULES[root_pkg],
                                severity=Severity.HIGH,
                                blocked_payload=f"import {alias.name}",
                            )
                        )

            # Check from x import y
            elif isinstance(node, ast.ImportFrom):
                if node.module:
                    root_pkg = node.module.split(".")[0]
                    if root_pkg in cls.RESTRICTED_MODULES:
                        violations.append(
                            SecurityViolation(
                                rule="UNAUTHORIZED_MODULE",
                                description=cls.RESTRICTED_MODULES[root_pkg],
                                severity=Severity.HIGH,
                                blocked_payload=f"from {node.module} import ...",
                            )
                        )

            # Check attribute access like os.environ or os.system
            elif isinstance(node, ast.Attribute):
                if node.attr in cls.DANGEROUS_ATTRIBUTES:
                    violations.append(
                        SecurityViolation(
                            rule="SECRET_HYGIENE_VIOLATION",
                            description=cls.DANGEROUS_ATTRIBUTES[node.attr],
                            severity=Severity.CRITICAL,
                            blocked_payload=f".{node.attr}",
                        )
                    )

            # Check calls to dangerous builtins like eval or exec
            elif isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name):
                    if node.func.id in ("eval", "exec", "__import__"):
                        violations.append(
                            SecurityViolation(
                                rule="DYNAMIC_EXECUTION_BLOCKED",
                                description=f"Dynamic evaluation using '{node.func.id}()' is prohibited in sandbox.",
                                severity=Severity.HIGH,
                                blocked_payload=f"{node.func.id}()",
                            )
                        )

        is_safe = len(violations) == 0
        return is_safe, violations

